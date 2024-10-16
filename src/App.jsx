// import React from 'react';
// import { SlideshowProvider } from './slideShowProvider';
// import MainComponent from './MainComponent.jsx'

// const App = () => {
//   const sessionId = "session_123";  // Generate session IDs dynamically in real case

//   return (

    
//     <div>helllllo
//     <SlideshowProvider sessionId={sessionId}>
//       <MainComponent />
//     </SlideshowProvider>
//     </div>
//   );
// };

// export default App;
import {ActiveUsersProvider} from './ActiveUsersProvider'

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Publisher from './Publisher';
import Subscriber from './Subscriber';

const App = () => {
  return (
    <ActiveUsersProvider>
    <Router>
      <Routes>
        <Route path="/pub" element={<Publisher />} />
        <Route path="/sub" element={<Subscriber />} />
      </Routes>
    </Router>
    </ActiveUsersProvider>
  );
};

export default App;