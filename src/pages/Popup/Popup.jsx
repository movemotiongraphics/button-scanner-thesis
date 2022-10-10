import React from 'react';
import { useState } from 'react';
import logo from '../../assets/img/logo.svg';
import Greetings from '../../containers/Greetings/Greetings';
import './Popup.css';

const Popup = () => {
  let scannerOn = false;
  let adScannerOn = false;
  let priceScannerOn = false;
  let ytScannerOn = false;
  let redditScannerOn = false;

  // const [scannerOn, setScanner] = useState(false);

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
    } else if (scannerOn == true) {
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

  let startYouTubeScan = (e) => {
    e.preventDefault();
    if (ytScannerOn == false) {
      ytScannerOn = true;

      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        let url = tabs[0].url;

        chrome.tabs.sendMessage(tabs[0].id, { buttonType: "startYouTubeScan", urlLink: url }, (response) => {
          console.log(response.message);
        });
      });
    } else {
      ytScannerOn = false;

      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { buttonType: "stopYouTubeScan" }, (response) => {
          console.log(response.message);
        });
      });
    }
  }

  let startPriceScan = (e) => {
    e.preventDefault();
    if (priceScannerOn == false) {
      priceScannerOn = true;

      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        let url = tabs[0].url;

        chrome.tabs.sendMessage(tabs[0].id, { buttonType: "startPriceScan", urlLink: url }, (response) => {
          console.log(response.message);
        });
      });
    } else {
      priceScannerOn = false;

      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { buttonType: "startPriceScan" }, (response) => {
          console.log(response.message);
        });
      });
    }
  }

  let startRedditScan = (e) => {
    e.preventDefault();
    if (redditScannerOn == false) {
      redditScannerOn = true;

      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        let url = tabs[0].url;

        chrome.tabs.sendMessage(tabs[0].id, { buttonType: "startRedditScan", urlLink: url }, (response) => {
          console.log(response.message);
        });
      });
    } else {
      redditScannerOn = false;

      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { buttonType: "stopRedditScan" }, (response) => {
          console.log(response.message);
        });
      });
    }
  }

  return (
    <div className="App-background">
      <header className="App-header">
        <p>
          Welcome to Yuan Jie's chrome toolkit!
        </p>
        <button type="button" onClick={startScan}>
          <span>{scannerOn ? 'Turn Off' : 'Scan Links'}</span>
        </button>
        <button type="button" onClick={startAdScan}>
          <span>{adScannerOn ? 'Turn Off' : 'Block Ads'}</span>
        </button>
        <button type="button" onClick={startYouTubeScan}>
          <span>{ytScannerOn ? 'Turn Off' : 'Im on YouTube'}</span>
        </button>
        <button type="button" onClick={startRedditScan}>
          <span>{redditScannerOn ? 'Turn Off' : 'Analyse Comment Sentiments'}</span>
        </button>
      </header>
    </div>
  );
};

export default Popup;
