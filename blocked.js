function secondsLeft(startTimeSplit, endTimeSplit) {

    var endDate = new Date();
    endDate.setHours(endTimeSplit[0]);
    endDate.setMinutes(endTimeSplit[1]);

    var startDate = new Date();
    startDate.setHours(startTimeSplit[0]);
    startDate.setMinutes(startTimeSplit[1]);

    var currentDate = new Date();

    if (currentDate < startDate) {
        return (currentDate.getTime() - startDate.getTime()) / 1000;
    }

    return (endDate.getTime() - currentDate.getTime()) / 1000;
}

chrome.storage.sync.get({
    websiteList: "",
    startTime: "06:00",
    endTime: "19:00"
}, function(options) {

    var startTimeSplit = options.startTime.split(":");
    var endTimeSplit = options.endTime.split(":");
    
    var sLeft = secondsLeft(startTimeSplit, endTimeSplit);

    var totalHours = Math.floor(sLeft / 3600);
    var totalMinutes = (sLeft % 3600) / 60;

    if (totalHours <= 0) {
        document.getElementById("time").innerHTML = "You will be able to view this page in " + totalMinutes + " minutes.";
    } else {
        document.getElementById("time").innerHTML = "You will be able to view this page in " + totalHours + " hours and " + totalMinutes + " minutes.";
    }
});