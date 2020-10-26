$(document).ready(initialize);

function initialize() {
    $(".option-panel__save-button").click(saveOptions);
}

function saveOptions() {
    let options = {}; 
    chrome.storage.local.set(options, function() {
        // Options are saved
    });
}

function loadOptions() {
    let options = {};
    chrome.storage.local.get(options, function(userOptions) {
        // Apply options from userOptions
    });
}
