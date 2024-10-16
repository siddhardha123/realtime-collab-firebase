import React, { useContext, useState } from 'react';
import { ActiveUsersContext } from './ActiveUsersProvider';

const Publisher = () => {
  const { activeUsers, currentSlide, updateSlideNumber } = useContext(ActiveUsersContext);
  const [slideIndex, setSlideIndex] = useState(0);

  const googleSlidesBaseUrl = 'https://docs.google.com/presentation/d/e/2PACX-1vSlVnhrYYA_4XDanLkrmNfCcC6oHBG0IOcwUC9zP9de_DmzYc0i0bxTC3eDhpga0crqalbJurbVaOca/embed?start=false&loop=false&delayms=3000&slide=';

  const handleNextSlide = () => {
    const newIndex = slideIndex + 1;
    setSlideIndex(newIndex);
    updateSlideNumber(newIndex); // Update the slide number in Firebase
  };

  const handlePreviousSlide = () => {
    const newIndex = slideIndex > 0 ? slideIndex - 1 : 0;
    setSlideIndex(newIndex);
    updateSlideNumber(newIndex); // Update the slide number in Firebase
  };

  return (
    <div>
      <h2>Publisher View</h2>
      <p>Active Users: {activeUsers}</p>
      <p>current slide: {currentSlide}</p>
      <iframe
        src={`${googleSlidesBaseUrl}${currentSlide}`} // Use currentSlide from context to show the correct slide
        frameBorder="0"
        width="960"
        height="569"
        allowFullScreen
        title="Google Slides"
      ></iframe>
      <div>
        <button onClick={handlePreviousSlide}>Previous Slide</button>
        <button onClick={handleNextSlide}>Next Slide</button>
      </div>
    </div>
  );
};

export default Publisher;
