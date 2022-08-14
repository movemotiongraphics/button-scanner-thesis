import React from 'react';
import logo from '../../assets/img/logo.svg';
import Greetings from '../../containers/Greetings/Greetings';
import './Popup.css';

const Popup = () => {
  let count = 0;

  let startScan = (e) => {
    e.preventDefault();
    console.log("button clicked" + count);

    chrome.storage.sync.set({ buttonClick: count }, function () {
      // when set runs
      console.log(count + 'sent to storage')
    });
    count++;
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Click here to scan your website!
        </p>
        <button type="button" onClick={startScan}>
          Scan!
        </button>
      </header>
    </div>
  );
};

export default Popup;
