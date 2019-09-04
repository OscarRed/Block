function saveOptions() {
    var websiteList = document.getElementById("websites").value;
    var startTime = document.getElementById("startTime").value;
    var endTime = document.getElementById("endTime").value;
    chrome.storage.sync.set({
        websiteList: websiteList,
        startTime: startTime,
        endTime: endTime
    }, function() {
        document.getElementById("status").textContent = "Options saved.";
        setTimeout(function() {
            document.getElementById("status").textContent = "";
        }, 750);
    });
}

function restoreOptions() {
    chrome.storage.sync.get({
        websiteList: "",
        startTime: "06:00",
        endTime: "18:00"
    }, function(options) {
        document.getElementById("websites").value = options.websiteList;
        document.getElementById("startTime").value = options.startTime;
        document.getElementById("endTime").value = options.endTime;
    });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);