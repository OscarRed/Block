chrome.webNavigation.onBeforeNavigate.addListener(function(details) {

    var currentHostname = new URL(details.url).hostname;

    chrome.storage.sync.get({
        websiteList: "www.youtube.com\nyoutube.com",
        startTime: "06:00",
        endTime: "18:00"
    }, function(options) {

        websiteList = options.websiteList.split(/\r?\n/);
        var startTimeSplit = options.startTime.split(":");
        var endTimeSplit = options.endTime.split(":");

        if (!inTime(startTimeSplit, endTimeSplit)) {
            return;
        }

        var timeNow = Date.now();

        if (websiteList.indexOf(currentHostname) >= 0) {

            var finalTime = Date.now() - timeNow;

            chrome.tabs.update(details.tabId, {
                url: "blocked.html"
            });
        }
    });
});

function inTime(startTimeSplit, endTimeSplit) {

    var endDate = new Date();
    endDate.setHours(endTimeSplit[0]);
    endDate.setMinutes(endTimeSplit[1]);

    var startDate = new Date();
    startDate.setHours(startTimeSplit[0]);
    startDate.setMinutes(startTimeSplit[1]);

    var currentDate = new Date();   

    return (startDate < currentDate && endDate > currentDate);
}