import { printLine } from './modules/print';

console.log('Content script works!');
console.log('Must reload extension for modifications to take effect.');

//get buttonclick
chrome.storage.onChanged.addListener(function (changes, area) {
    console.log(area)

    const changedItems = Object.keys(changes);

    for (let item of changedItems) {
        console.log(`${item} has changed:`);
        console.log("Old value: ", changes[item].oldValue);
        console.log("New value: ", changes[item].newValue);
    }


    // highlight all buttons
    let allButtons = document.querySelectorAll('button, input, [class*="button"], [class*="Button"], [class*="btn"]');
    allButtons.forEach(function (item, index) {
        item.style.backgroundColor = "orange";
        item.classList.add("scanner-selected");
        item.style.zIndex = "100";
    })

    var whiteBackdrop = document.createElement('div');
    document.body.appendChild(whiteBackdrop);
    whiteBackdrop.style.cssText = 'position:sticky;width:100vw;height:100vh;opacity:0.3;z-index:90;background-color:#ffffff;';

    // press buttons

    // take GET Request headers
});


printLine("Using the 'printLine' function from the Print Module");
