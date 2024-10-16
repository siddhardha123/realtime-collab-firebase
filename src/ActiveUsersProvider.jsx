import React, { createContext, useState, useEffect, useCallback } from 'react';
import { ref, set, onDisconnect, onValue } from 'firebase/database';
import { v4 as uuidv4 } from 'uuid';
import { database } from './firebase'; // Firebase setup

const ActiveUsersContext = createContext();

const ActiveUsersProvider = ({ children }) => {
  const [activeUsers, setActiveUsers] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0); // Store only the slide number
  const sessionId = 'sess1'; // Generate unique session ID for this user

  useEffect(() => {
    const usersRef = ref(database, 'activeUsers/' + sessionId);
    set(usersRef, true);
    onDisconnect(usersRef).remove();

    const activeUsersRef = ref(database, 'activeUsers');
    onValue(activeUsersRef, (snapshot) => {
      const users = snapshot.val() || {};
      setActiveUsers(Object.keys(users).length);
    });

    return () => {
      set(usersRef, null);
    };
  }, [sessionId]);

  useEffect(() => {
    const slideRef = ref(database, 'currentSlide');
    onValue(slideRef, (snapshot) => {
      const slideNumber = snapshot.val() || 0; // Default to 0 if not set
      setCurrentSlide(slideNumber);
    });
  }, []);

  const updateSlideNumber = useCallback((newSlideNumber) => {
    const slideRef = ref(database, 'currentSlide');
    set(slideRef, newSlideNumber); // Update Firebase with the new slide number
  }, []);

  return (
    <ActiveUsersContext.Provider value={{ activeUsers, currentSlide, updateSlideNumber }}>
      {children}
    </ActiveUsersContext.Provider>
  );
};

export { ActiveUsersProvider, ActiveUsersContext };
