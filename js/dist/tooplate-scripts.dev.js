"use strict";

var devices = document.getElementById("devices");
var deviceForm = document.getElementById("deviceForm");
var devicesContainer = [];
var timeContainer = [];

if (sessionStorage.getItem("devicesData") == null) {
  devicesContainer = [];
} else {
  devicesContainer = JSON.parse(sessionStorage.getItem("devicesData"));
}

displayDevices();
stopwatch();
deviceForm.addEventListener("submit", function (e) {
  e.preventDefault();
  addDevice();
  displayDevices();
  deviceForm.reset();
  $("#staticBackdrop").modal("hide");
  stopwatch();
}); // __________________________________________________________________________ add device

function addDevice() {
  var formData = new FormData(deviceForm);
  var device = {
    index: formData.get("index"),
    name: formData.get("name"),
    players: formData.get("customRadioInline"),
    hours: parseInt(formData.get("hours")),
    mins: parseInt(formData.get("mins")),
    // open: formData.has("open"),
    hoursCount: "00",
    minsCount: "00",
    secsCount: "00"
  };
  devicesContainer.push(device);
  sessionStorage.setItem("devicesData", JSON.stringify(devicesContainer));
} // _________________________________________________________________________ display devices


function displayDevices() {
  var temp = "";
  var players;
  var timeStatus;
  devicesContainer.forEach(function (item) {
    // check players radio button
    if (item.players == "single") {
      players = "x2";
    } else {
      players = "x4";
    } // display status


    if (item.hours == 0 && item.mins == 0) {
      timeStatus = "مفتوح";
    } else {
      timeStatus = "".concat(item.hours, "H :").concat(item.mins, "M");
    }

    temp += "<div class=\"col-sm-12 col-md-6 col-lg-4 col-xl-3 p-3\" id=\"deviceTemp\">\n    <div class=\"tm-notification-item w-100\">\n        <div class=\"tm-device-header px-4 py-1\">\n            <h5>\u062C\u0647\u0627\u0632 \u0631\u0642\u0645<b class=\"text-warning border-bottom border-danger mx-4\"> ".concat(item.index, "</b></h5>\n            <h5 class=\"text-success\">").concat(item.name, "</h5>\n            <i class=\"fab fa-playstation\"></i>\n        </div>\n        <div class=\"media-body\">\n            <div\n                class=\"tm-bg-gray m-3 rounded d-flex justify-content-center align-items-center\">\n                <!-- <i class=\"fas fa-toggle-on text-success d-none\"></i>\n                <i class=\"fas fa-toggle-off text-danger\"></i> -->\n                <p class=\"my-0 px-2\" id=\"timeStatus\">").concat(timeStatus, "</p>\n            </div>\n            <div class=\"h5 py-1 px-5 d-flex justify-content-around\" dir=\"ltr\" id=\"time\">\n                <span id=\"hours\">").concat(item.hoursCount, "</span>:<span id=\"mins\">").concat(item.minsCount, "</span>:<span id=\"secs\">").concat(item.secsCount, "</span>\n            </div>\n  \n            <div class=\"d-flex justify-content-around py-3\">\n                <div class=\"d-flex\">\n                    <div class=\"btn-secondary text-white p-1 radius-right text-center\" id=\"players\">").concat(players, "</div>\n                    <a class=\"btn btn-success text-white py-1 px-3 radius-right-0\" id=\"start\">\n                        <i class=\"fas fa-play\"></i>\n                        \u0628\u062F\u0621\n                    </a>\n                    <a class=\"btn btn-danger text-white py-1 px-2 radius-right-0 d-none\"\n                        id=\"stop\">\n                        <i class=\"fas fa-pause\"></i>\n                        \u0627\u064A\u0642\u0627\u0641\n                    </a>\n                </div>\n                <a class=\"btn btn-warning text-white py-1 px-2\">\n                    <i class=\"fas fa-times\"></i>\n                    \u0627\u0646\u0647\u0627\u0621\n                </a>\n                <a class=\"btn btn-info\" href=\"\">\n                    <i class=\"fas fa-coffee\"></i>\n                    <!-- <i class=\"fas fa-ellipsis-v\"></i> -->\n                </a>\n            </div>\n            <button class=\"w-100 btn btn-primary\">\n                <i class=\"far fa-handshake\"></i>\n                \u0645\u062D\u0627\u0633\u0628\u0629 \u0627\u0644\u0627\u0646\n            </button>\n        </div>\n    </div>\n  </div>");
  });
  devices.innerHTML = temp;
} // stopwatch


function stopwatch() {
  var devicesTemp = document.querySelectorAll("#deviceTemp");
  devicesTemp.forEach(function (temp) {
    console.log(temp);
    var hours = parseInt(temp.querySelector("#hours").innerText);
    var mins = parseInt(temp.querySelector("#mins").innerText);
    var secs = parseInt(temp.querySelector("#secs").innerText);
    console.log(hours, mins, secs);
    var startBtn = temp.querySelector("#start");
    var stopBtn = temp.querySelector("#stop");
    var timeObj = {
      hour: hours,
      min: mins,
      sec: secs
    };

    function setTime() {
      timeObj.sec++;

      if (timeObj.sec < 10) {
        timeObj.sec = "0" + timeObj.sec;
      }

      if (timeObj.sec == 60) {
        timeObj.min++;

        if (timeObj.min < 10) {
          timeObj.min = "0" + timeObj.min;
        }

        timeObj.sec = "00";
      }

      if (timeObj.min == 60) {
        timeObj.hour++;

        if (timeObj.hour < 10) {
          timeObj.hour = "0" + timeObj.hour;
        }

        timeObj.min = "00";
      }

      timeContainer.push(timeObj);
      sessionStorage.setItem("timer", JSON.stringify(timeContainer)); // timeContainer.forEach((timer) => {

      console.log(timeObj);
      hours.innerText = timeObj.hour;
      mins.innerText = timeObj.min;
      secs.innerText = timeObj.sec; // });
    }

    $(document).ready(function () {
      console.log(temp);

      if (sessionStorage.getItem("timer") !== null) {
        timeObj = JSON.parse(sessionStorage.getItem("timer"));
        console.log(timeObj);
        hours.innerText = timeObj.hour;
        mins.innerText = timeObj.min;
        secs.innerText = timeObj.sec;
        startBtn.classList.add(sessionStorage.className);
        stopBtn.classList.remove(sessionStorage.className);

        if (sessionStorage.getItem("className") !== null) {
          setInterval(setTime, 1000);
        }
      }

      var timeStart;
      startBtn.addEventListener("click", function () {
        this.classList.add("d-none");
        stopBtn.classList.remove("d-none");
        sessionStorage.className = "d-none";
        timeStart = setInterval(setTime, 1000); // console.log(timeObj);
      });
      stopBtn.addEventListener("click", function () {
        this.classList.add("d-none");
        startBtn.classList.remove("d-none");
        sessionStorage.removeItem("className");
        clearInterval(timeStart);
        sessionStorage.setItem("timer", JSON.stringify(timeContainer));
      });
    });
  });
} // set correct syntax time
// if (device.hours == 0 && device.mins == 0) {
//   device.hours = "00";
//   device.mins = "00";
// } else if (device.hours < 10 || device.mins < 10) {
//   device.hours = "0" + device.hours;
//   device.mins = "0" + device.mins;
// }