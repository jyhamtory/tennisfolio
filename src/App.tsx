import React from 'react';
import './App.css';

import NavGroup from './component/NavGroup';
import FooterTop from './component/FooterTop';
import FooterBottom from './component/FooterBottom';

function App(): JSX.Element {
  return (
    <div className="App">
      <NavGroup />
      <FooterTop />
      <FooterBottom />
    </div>
  );
}

export default App;
