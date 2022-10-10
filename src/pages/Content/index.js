import { reduceEachTrailingCommentRange } from 'typescript';
import { printLine } from './modules/print';

console.log('Content script works!');
console.log('Must reload extension for modifications to take effect.');

let currentURL;

//get buttonclick
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        switch (request.buttonType) {
            case 'startScan':
                sendResponse({ message: "Starting Scan" });
                currentURL = window.location.host;

                // highlight all buttons
                let allButtons = document.querySelectorAll('button, input, [class*="button"], [class*="Button"], [class*="btn"]');
                allButtons.forEach(function (item, index) {
                    // item.style.backgroundColor = "orange";
                    item.classList.add("scanner-selected");
                    // item.style.zIndex = "100";
                    item.addEventListener('click', function revealButton(event) {
                        console.log("clicked on " + event.target.className)

                        chrome.runtime.sendMessage({ buttonType: "getData" }, function (response) {
                            console.log(response.message);
                        });

                    });
                });

                let newOverlay = document.createElement("div");
                newOverlay.style.cssText = 'font-size: 13px;position: absolute; display: flex; align-items: stretch; left:0px;top:0px;width:100%;height:1000vh;opacity:0.8;z-index:90;background-color:#ffffff;';
                document.body.appendChild(newOverlay);

                let allLinks = document.querySelectorAll("a")
                allLinks.forEach(function (item, index) {
                    //check if js event opens new link
                    if (item.href !== '' && item.href.includes('javascript:void(0)') && item.getAttribute('onclick') !== '') {
                        item.classList.add("link-selected-ad" + index);
                        let link = item.getAttribute('onclick').split(" ")[0];
                        link = link.replace("window.open('", '');
                        console.log(link);

                        if (link.length > 40) {
                            link = link.substring(0, 40) + "...";
                        }

                        //get position of button

                        let topPos = item.getBoundingClientRect().top + window.scrollY;
                        let leftPos = item.getBoundingClientRect().left + window.scrollX;

                        let itemHeight = item.offsetHeight;
                        // console.log(itemHeight)
                        // console.log(topPos, leftPos)

                        const appendLink = document.createElement("div");
                        const linkText = document.createTextNode(link);
                        appendLink.appendChild(linkText);
                        newOverlay.appendChild(appendLink);

                        appendLink.style.cssText = `display: block; position:absolute; left: ${leftPos}px; top: ${topPos + itemHeight}px`
                        appendLink.style.color = "red";
                    }

                    //check hrefs
                    if (item.href !== '' && item.href.includes('://')) {
                        item.classList.add("link-selected-" + index);
                        let link = item.getAttribute("href");

                        if (link.length > 40) {
                            link = link.substring(0, 40) + "...";
                        }

                        //get position of button

                        let topPos = item.getBoundingClientRect().top + window.scrollY;
                        let leftPos = item.getBoundingClientRect().left + window.scrollX;

                        let itemHeight = item.offsetHeight;
                        // console.log(itemHeight)
                        // console.log(topPos, leftPos)

                        const appendLink = document.createElement("div");
                        const linkText = document.createTextNode(link);
                        appendLink.appendChild(linkText);
                        newOverlay.appendChild(appendLink);

                        appendLink.style.cssText = `display: block; position:absolute; left: ${leftPos}px; top: ${topPos + itemHeight}px; opacity: ${(leftPos > 0) ? '1' : '0'}`

                        //if outgoing url is the same as base url, highlight green
                        if (link.includes(currentURL)) {
                            appendLink.style.color = "green";
                        } else {
                            appendLink.style.color = "red";
                        }
                    }
                });

                break;

            case 'startAdScan':
                sendResponse({ message: "Starting Ad Scan" });

                currentURL = window.location.host;

                // highlight all ads
                let allAds = document.querySelectorAll("[id*='ads'], [id*='ad']");
                allAds.forEach(function (item, index) {
                    item.classList.add("ad-selected");
                    item.classList.add("animate-all");
                    console.log(item)

                    let newAdOverlay = document.createElement("div");
                    newAdOverlay.classList.add("linkOverlay");
                    item.appendChild(newAdOverlay);

                    //get random $$

                    function genRand(min, max, decimalPlaces) {
                        var rand = Math.random() * (max - min) + min;
                        var power = Math.pow(10, decimalPlaces);
                        return Math.floor(rand * power) / power;
                    }

                    const linkText = document.createTextNode(`${genRand(500, 1000, 0)} has blocked this ad and it costed the company $${genRand(500, 1000, 2)} :(`);
                    newAdOverlay.appendChild(linkText);

                    const closeButton = document.createElement("button");
                    closeButton.classList.add("button-close");
                    closeButton.innerHTML = "Close it anyway :(";
                    closeButton.onclick = function () {
                        item.style.opacity = "0.2";
                        parentDiv = item.parentNode;

                        //closing div
                        const closingDiv = document.createElement('div')
                        const closeText = document.createTextNode(`Are you really sure? :(`);
                        closingDiv.style.cssText = `position: absolute; display: block; width: 100%, height: 100%; font-size: 50px`;

                        const closeButton2 = document.createElement("button");
                        closeButton2.innerHTML = "Close it";

                        const openButton2 = document.createElement("button");
                        openButton2.innerHTML = "Open it back"

                        parentDiv.appendChild(closingDiv)
                        closingDiv.appendChild(closeText);
                        closingDiv.appendChild(closeButton2)
                        closingDiv.appendChild(openButton2)

                        closeButton2.onclick = function () {
                            item.style.opacity = "0";
                        }

                        openButton2.onclick = function () {
                            closingDiv.style.opacity = "0";
                            item.style.transform = "scale(2,2)";
                        }

                    }
                    newAdOverlay.appendChild(closeButton);
                });

                break;

            // case 'startPriceScan':
            //     sendResponse({ message: "Starting Price Scan" });
            //     currentURL = window.location.host;

            //     // const matches = [];
            //     // let text = "$";
            //     // // highlight all low prices
            //     // for (const div of document.querySelectorAll('div')) {
            //     //     if (div.textContent.includes(text)) {
            //     //         console.log(matches)
            //     //     }
            //     // }

            //     break;

            case 'startYouTubeScan':
                sendResponse({ message: "Starting YouTube Thumbnail Scan" });
                currentURL = window.location.host;

                let allThumbnails = document.querySelectorAll("[src*='i.ytimg.com']");
                allThumbnails.forEach(function (item, index) {
                    console.log(item)
                })

                break;

            case 'startRedditScan':
                sendResponse({ message: "Starting Reddit Comment Sentiment Analysis" });
                currentURL = window.location.host;

                let allCommentButtons = document.querySelectorAll("[data-click-id*='comments']");
                allCommentButtons.forEach(function (item, index) {
                    console.log(item)
                })

                break;

            //Stop scans
            case 'stopScan':
                sendResponse({ message: "stopping scan" });
                break;

            case 'stopAdScan':
                sendResponse({ message: "stopping Ad scan" });
                break;

            case 'stopYouTubeScan':
                sendResponse({ message: "stopping YouTube scan" });
                break;

            case 'stopRedditScan':
                sendResponse({ message: "stopping Reddit scan" });
                break;

            default:
                response('unknown request');
                break;
        }
    })


printLine("Using the 'printLine' function from the Print Module");
