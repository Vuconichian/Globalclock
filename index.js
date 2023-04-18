
function displayAllUTCTimes() {
    var utcDate = new Date();
    var utcTimesDiv = document.getElementById("utc-times");
    for (var i = -12; i <= 12; i++) {
        utcDate.setUTCHours(utcDate.getUTCHours() + i);
        var localTime = getLocalTimeFromUTC(utcDate);
        var utcTimeString = "UTC" + (i >= 0 ? "+" : "") + i + ": " + localTime;
        var utcTimeElement = document.createElement("p");
        var utcTimeText = document.createTextNode(utcTimeString);
        utcTimeElement.appendChild(utcTimeText);
        utcTimesDiv.appendChild(utcTimeElement);
    }
}

function getTimezoneOffset() {
    var d = new Date();
    var offset = d.getTimezoneOffset();
    return offset;
}


function getLocalTimeFromUTC(utcDate) {
    var d = new Date(utcDate);
    var offset = d.getTimezoneOffset();
    var localTime = new Date(d.getTime() - (offset * 60 * 1000));
    return localTime;
}

function updateLocalTime() {
    var localTimeElement = document.getElementById("local-time");
    var localTime = new Date();
    var localTimeString = "Local Time: " + localTime.toLocaleTimeString();
    localTimeElement.textContent = localTimeString;
}

setInterval(updateLocalTime, 1000);

displayAllUTCTimes();