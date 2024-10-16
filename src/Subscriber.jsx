import React, { useContext } from 'react';
import { ActiveUsersContext } from './ActiveUsersProvider';

const Subscriber = () => {
  const { activeUsers, currentSlide } = useContext(ActiveUsersContext);
  const googleSlidesBaseUrl = 'https://docs.google.com/presentation/d/e/2PACX-1vSlVnhrYYA_4XDanLkrmNfCcC6oHBG0IOcwUC9zP9de_DmzYc0i0bxTC3eDhpga0crqalbJurbVaOca/embed?start=false&loop=false&delayms=3000&slide=';

  return (
    <div>
      <h2>Subscriber View</h2>
      <p>Active Users: {activeUsers}</p>
      <p>current slide: {currentSlide}</p>
      {currentSlide >= 0 ? ( // Check if the slide index is valid
        <iframe
          src={`${googleSlidesBaseUrl}${currentSlide}`} // Construct URL using slide number
          frameBorder="0"
          width="960"
          height="569"
          allowFullScreen
          title="Google Slides"
        ></iframe>
      ) : (
        <p>Waiting for the publisher to update the slide...</p>
      )}
    </div>
  );
};

export default Subscriber;
