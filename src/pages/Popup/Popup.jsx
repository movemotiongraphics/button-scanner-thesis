import React from 'react';
import { useEffect } from 'react';
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
  let instagramScannerOn = false;
  let replaceScrollbarOn = false;

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

        chrome.tabs.sendMessage(tabs[0].id, { buttonType: "startRedditScan" }, (response) => {
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

  let startInstagramScan = (e) => {
    e.preventDefault();
    if (instagramScannerOn == false) {
      instagramScannerOn = true;

      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        let url = tabs[0].url;

        chrome.tabs.sendMessage(tabs[0].id, { buttonType: "startInstagramScan" }, (response) => {
          console.log(response.message);
        });
      });
    } else {
      instagramScannerOn = false;

      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { buttonType: "stopRedditScan" }, (response) => {
          console.log(response.message);
        });
      });
    }
  }

  let replaceScrollbar = (e) => {
    e.preventDefault();

    if (replaceScrollbarOn == false) {
      replaceScrollbarOn = true;

      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        let url = tabs[0].url;

        chrome.tabs.sendMessage(tabs[0].id, { buttonType: "replaceScrollbar" }, (response) => {
          console.log(response.message);
        });
      });
    } else {
      replaceScrollbarOn = false;

      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { buttonType: "stopReplaceScrollbar" }, (response) => {
          console.log(response.message);
        });
      });
    }
  }

  //get value of form
  const [currentTime, setTime] = useState('5');

  const changeTime = (event) => {
    setTime(event.target.value);

    console.log('new time is' + currentTime)
  }

  //update button

  const [slackTimerOn, setSlackTimer] = useState(false);

  const toggleSlackTimer = () => {
    setSlackTimer(current => !current);
  }

  useEffect(() => {
    if (!slackTimerOn) {
      console.log('The alarm is off')

      chrome.runtime.sendMessage({ message: "stopSlackTimer" }, (response) => {
        console.log(response.message);
      });

    } else if (slackTimerOn) {
      console.log('slack timer is on')

      chrome.runtime.sendMessage({ message: "startSlackTimer", alarmTime: currentTime }, (response) => {
        console.log(response.message);
      });


      // chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      //   let url = tabs[0].url;

      //   chrome.tabs.sendMessage(tabs[0].id, { buttonType: "setTimerOverlay", alarmTime: currentTime }, (response) => {
      //     console.log(response.message);
      //   });
      // });

    }
  }, [slackTimerOn]);

  // let startSlackTimer = (e) => {
  //   e.preventDefault();

  //   if (replaceScrollbarOn == false) {
  //     replaceScrollbarOn = true;

  //     chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  //       let url = tabs[0].url;

  //       chrome.tabs.sendMessage(tabs[0].id, { buttonType: "replaceScrollbar", urlLink: url }, (response) => {
  //         console.log(response.message);
  //       });
  //     });
  //   } else {
  //     replaceScrollbarOn = false;

  //     chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  //       chrome.tabs.sendMessage(tabs[0].id, { buttonType: "stopReplaceScrollbar" }, (response) => {
  //         console.log(response.message);
  //       });
  //     });
  //   }
  // }

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
          <span>{redditScannerOn ? 'Turn Off' : 'Click this before you read Reddit'}</span>
        </button>
        <button type="button" onClick={startInstagramScan}>
          <span>{instagramScannerOn ? 'Turn Off' : 'Im on Instagram'}</span>
        </button>
        {/* <button type="button" onClick={replaceScrollbar}>
          <span>{replaceScrollbarOn ? 'Turn Off' : 'Try Scrolling with this'}</span>
        </button> */}
        <form className="customForm">
          {slackTimerOn ? <div></div> :
            <div className="gap">
              <div className="centerText">I want to take a break for</div>
              <input type="text" className="centerText" onChange={changeTime} ></input>
              <div className="centerText">seconds.</div>
            </div>}
          <button type="button" onClick={toggleSlackTimer}>
            <span>{slackTimerOn ? 'Your Slack Timer is active' : 'Break Time'}</span>
          </button>
        </form>
      </header>
    </div>
  );
};

export default Popup;
