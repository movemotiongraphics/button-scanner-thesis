import React from 'react';
import logo from '../../assets/img/logo.svg';
import Greetings from '../../containers/Greetings/Greetings';
import './Popup.css';

const Popup = () => {
  let scannerOn = false;
  let adScannerOn = false;

  let startScan = (e) => {
    e.preventDefault();
    if (scannerOn == false) {
      scannerOn = true;

      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        let url = tabs[0].url;

        chrome.tabs.sendMessage(tabs[0].id, { buttonType: "startScan", urlLink: url }, (response) => {
          console.log(response.message);
        });
      });
    } else {
      scannerOn = false;

      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { buttonType: "stopScan" }, (response) => {
          console.log(response.message);
        });
      });
    }
  }

  let startAdScan = (e) => {
    e.preventDefault();
    if (adScannerOn == false) {
      adScannerOn = true;

      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        let url = tabs[0].url;

        chrome.tabs.sendMessage(tabs[0].id, { buttonType: "startAdScan", urlLink: url }, (response) => {
          console.log(response.message);
        });
      });
    } else {
      adScannerOn = false;

      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { buttonType: "stopAdScan" }, (response) => {
          console.log(response.message);
        });
      });
    }
  }

  return (
    <div className="App-background">
      <header className="App-header">
        <p>
          Click here to scan your website!
        </p>
        <button type="button" onClick={startScan}>
          <span>{scannerOn ? 'Turn Off' : 'Scan Links'}</span>
        </button>
        <button type="button" onClick={startAdScan}>
          <span>{adScannerOn ? 'Turn Off' : 'Block Ads'}</span>
        </button>
      </header>
    </div>
  );
};

export default Popup;
