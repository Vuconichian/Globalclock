
function displayAllUTCTimes(utcOffset) {
    var utcDate = new Date();
    var utcTimesDiv = document.getElementById("utc-times");
    utcTimesDiv.innerHTML = ""; // Vaciar el contenedor antes de actualizarlo
    for (var i = -12; i <= 12; i++) {
        utcDate.setUTCHours(utcDate.getUTCHours() + i + utcOffset);
        var localTime = getLocalTimeFromUTC(utcDate);
        var utcTimeString = "UTC" + (i >= 0 ? "+" : "") + i + ": " + localTime;
        var utcTimeElement = document.createElement("p");
        var utcTimeText = document.createTextNode(utcTimeString);
        utcTimeElement.appendChild(utcTimeText);
        utcTimesDiv.appendChild(utcTimeElement);
    }
}

document.getElementById("utc-minus").addEventListener("click", function() {
    var utcOffset = parseInt(localStorage.getItem("utcOffset"));
    if (utcOffset > -12) {
        utcOffset--;
        localStorage.setItem("utcOffset", utcOffset);
        displayAllUTCTimes(utcOffset);
    }
});

document.getElementById("utc-plus").addEventListener("click", function() {
    var utcOffset = parseInt(localStorage.getItem("utcOffset"));
    if (utcOffset < 12) {
        utcOffset++;
        localStorage.setItem("utcOffset", utcOffset);
        displayAllUTCTimes(utcOffset);
    }
});

// Obtener la zona horaria almacenada en el localStorage
var utcOffset = parseInt(localStorage.getItem("utcOffset"));
if (isNaN(utcOffset)) {
    utcOffset = 0;
    localStorage.setItem("utcOffset", utcOffset);
}
displayAllUTCTimes(utcOffset);