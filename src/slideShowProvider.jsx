import React, { createContext, useEffect, useState } from 'react';
import { ref, set, onValue, remove, child } from 'firebase/database';
import { database } from './firebase';

const SlideshowContext = createContext();

export const SlideshowProvider = ({ sessionId, children }) => {
  const [slide, setSlide] = useState(1);  // Default slide
  const [activeUsers, setActiveUsers] = useState(0);
  const [userId, setUserId] = useState(null);  // Store userId to remove later

  useEffect(() => {
    // Generate a unique user ID for this session
    const uniqueUserId = `user_${Date.now()}`;
    setUserId(uniqueUserId);

    // Add the user to Firebase
    const userRef = ref(database, `sessions/${sessionId}/users/${uniqueUserId}`);
    set(userRef, { active: true });

    // Track active users count
    const userCountRef = ref(database, `sessions/${sessionId}/users`);
    onValue(userCountRef, (snapshot) => {
      const users = snapshot.val();
      const activeCount = Object.keys(users || {}).length;
      setActiveUsers(activeCount);
    });

    // Clean up the user session on unmount or page unload
    const cleanUpUserSession = () => {
      remove(userRef); // Remove this user from the session
    };

    // Remove user on page unload
    window.addEventListener('beforeunload', cleanUpUserSession);

    // Clean up when the component unmounts
    return () => {
      cleanUpUserSession();
      window.removeEventListener('beforeunload', cleanUpUserSession);
    };
  }, [sessionId]);

  // Function for publisher to change the slide
  const changeSlide = (newSlide) => {
    const slideRef = ref(database, `sessions/${sessionId}/slide`);
    set(slideRef, { currentSlide: newSlide });
  };

  useEffect(() => {
    // Listen for slide changes
    const slideRef = ref(database, `sessions/${sessionId}/slide`);
    onValue(slideRef, (snapshot) => {
      if (snapshot.exists()) {
        setSlide(snapshot.val().currentSlide);
      }
    });
  }, [sessionId]);

  return (
    <SlideshowContext.Provider value={{ slide, changeSlide, activeUsers }}>
      {children}
    </SlideshowContext.Provider>
  );
};

export const useSlideshow = () => React.useContext(SlideshowContext);
