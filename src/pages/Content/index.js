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

            case 'startScan':
                sendResponse({ message: "stopping scan" });
                break;

            default:
                response('unknown request');
                break;
        }
    })


printLine("Using the 'printLine' function from the Print Module");
