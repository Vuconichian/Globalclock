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

var cityInfo = {
    "-12": "Eniwetok, Kwajalein",
    "-11": "Samoa",
    "-10": "Hawaiian Standard Time",
    "-9": "Alaska Standard Time",
    "-8": "Pacific Standard Time",
    "-7": "Mountain Standard Time",
    "-6": "Central Standard Time",
    "-5": "Lima - Peru",
    "-4": "Atlantic Standard Time",
    "-3": "Brazilia",
    "-2": "Mid-Atlantic",
    "-1": "Azores, Cape Verde",
    "0": "Greenwich Mean Time",
    "1": "Central European Time",
    "2": "Eastern European Time",
    "3": "Baghdad, Kuwait, Moscow",
    "4": "Abu Dhabi, Muscat, Baku",
    "5": "Karachi, Tashkent",
    "6": "Almaty, Dhaka",
    "7": "Bangkok, Jakarta",
    "8": "Hong Kong, Beijing",
    "9": "Tokyo, Seoul",
    "10": "Sydney, Melbourne",
    "11": "Solomon Islands, New Caledonia",
    "12": "Fiji, Kamchatka"
};

function updateHour(offset) {
    var localTime = new Date();
    var utcTime = new Date(localTime.getTime() + (offset * 60 * 60 * 1000));
    var hour = utcTime.getUTCHours().toString().padStart(2, "0");
    var minute = utcTime.getUTCMinutes().toString().padStart(2, "0");
    var second = utcTime.getUTCSeconds().toString().padStart(2, "0");
    var timeString = hour + ":" + minute + ":" + second;
    var timeElement = document.getElementById("local-time");
    timeElement.innerHTML = timeString;

    var cityInfoElement = document.getElementById("city-info");
    var cityInfoText = cityInfo[hour];
    if (cityInfoText) {
        cityInfoElement.innerHTML = cityInfoText;
    } else {
        cityInfoElement.innerHTML = "";
    }
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