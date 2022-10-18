console.log('This is the background page.');
console.log('Put the background scripts here.');


// chrome.tabs.query({ active: true, lastFocusedWindow: true }, function (tabs) {
//     chrome.webRequest.onBeforeRequest.addListener(
//         function (details) {
//             console.log(details);
//         },
//         networkFilters
//     );
// })

//checks when new tabs(links are clicked) are created

let timeBeforeAlarm;

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        // console.log(request)

        switch (request.message) {
            case 'startSlackTimer':
                console.log('starting slack timer');

                timeBeforeAlarm = request.alarmTime;

                const dt = new Date();
                dt.setSeconds(dt.getSeconds() + parseInt(timeBeforeAlarm));
                chrome.alarms.create("slackAlarm", { when: dt.getTime() })

                //create alarm to countdown
                chrome.alarms.create('periodic', { periodInMinutes: 0.16667 });


                sendResponse({ message: 'Response from startSlackTimer' });
                break;
            case 'stopSlackTimer':
                console.log('stopping slack timer');

                chrome.alarms.clear("slackAlarm");
                chrome.alarms.clear("periodic");

                sendResponse({ message: 'Response from stopSlackTimer' })
                break;
            default:
                sendResponse('unknown request');
                break;
        }
    }
);


chrome.alarms.onAlarm.addListener((alarm) => {
    switch (alarm.name) {
        case 'slackAlarm':
            console.log("the alarm is over!!")
            chrome.alarms.clear("periodic");
            break;

        case 'periodic':
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {

                chrome.tabs.sendMessage(tabs[0].id, { buttonType: "setTimerOverlay", alarmTime: currentCount }, (response) => {
                    console.log(response.message);
                });
            });
            break;
        default:
            break;
    }
})