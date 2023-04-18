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

function displayAllUTCTimes() {
    var utcDate = new Date();
    var utcTimesDiv = document.getElementById("utc-times");
    utcTimesDiv.innerHTML = "";
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

function updateHour(offset) {
    var localTime = new Date();
    var utcTime = new Date(localTime.getTime() + (offset * 60 * 60 * 1000));
    var hour = utcTime.getUTCHours().toString().padStart(2, "0");
    var minute = utcTime.getUTCMinutes().toString().padStart(2, "0");
    var second = utcTime.getUTCSeconds().toString().padStart(2, "0");
    var timeString = hour + ":" + minute + ":" + second;
    var timeElement = document.getElementById("local-time");
    timeElement.innerHTML = timeString;
}


function init() {
    // Mostrar hora local
    updateHour(getTimezoneOffset()/-60);

    // Mostrar horas en UTC
    displayAllUTCTimes();

    // Ajustar hora hacia adelante
    var forwardButton = document.getElementById("forward-button");
    forwardButton.addEventListener("click", function() {
        updateHour(getTimezoneOffset()/-60 + 1);
    });

    // Ajustar hora hacia atrás
    var backButton = document.getElementById("back-button");
    backButton.addEventListener("click", function() {
        updateHour(getTimezoneOffset()/-60 - 1);
    });
}

init();