import React from 'react';
import { useSlideshow } from './slideShowProvider';

const MainComponent = () => {
  const { slide, changeSlide, activeUsers } = useSlideshow();

  return (
    <div>
      <h1>Current Slide: {slide}</h1>
      <button onClick={() => changeSlide(slide + 1)}>Next Slide</button>
      <p>Active Users: {activeUsers}</p>
    </div>
  );
};

export default MainComponent;
