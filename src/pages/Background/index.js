console.log('This is the background page.');
console.log('Put the background scripts here.');

const tabStorage = {};
const networkFilters = {
    urls: [
        "<all_urls>"
    ]
};

// chrome.tabs.query({ active: true, lastFocusedWindow: true }, function (tabs) {
//     chrome.webRequest.onBeforeRequest.addListener(
//         function (details) {
//             console.log(details);
//         },
//         networkFilters
//     );
// })

//checks when new tabs(links are clicked) are created

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        console.log(request)

        switch (request.buttonType) {
            case 'getData':
                console.log("getting dataa pls work")
                sendResponse({ message: "Visulising Headers" });

                // chrome.runtime.sendMessage({ buttonType: "visualiseLinks" }, function (response) {
                //     console.log(response.message);
                // });

                break;
            default:
                response('unknown request');
                break;
        }
    }
);

// chrome.webRequest.onBeforeRequest.addListener(
//     function (details) {
//         console.log(details);
//     },
//     { urls: ["<all_urls>"] },
//     ["blocking"]
// );