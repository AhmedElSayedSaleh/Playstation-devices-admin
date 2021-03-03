let devices = document.getElementById("devices");
let deviceForm = document.getElementById("deviceForm");

let devicesContainer = [];
let timeContainer = [];

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
});

// __________________________________________________________________________ add device
function addDevice() {
  let formData = new FormData(deviceForm);

  let device = {
    index: formData.get("index"),
    name: formData.get("name"),
    players: formData.get("customRadioInline"),
    hours: parseInt(formData.get("hours")),
    mins: parseInt(formData.get("mins")),
    // open: formData.has("open"),
    hoursCount: "00",
    minsCount: "00",
    secsCount: "00",
  };

  devicesContainer.push(device);
  sessionStorage.setItem("devicesData", JSON.stringify(devicesContainer));
}
// _________________________________________________________________________ display devices
function displayDevices() {
  let temp = "";
  let players;
  let timeStatus;

  devicesContainer.forEach((item) => {
    // check players radio button
    if (item.players == "single") {
      players = "x2";
    } else {
      players = "x4";
    }

    // display status
    if (item.hours == 0 && item.mins == 0) {
      timeStatus = "مفتوح";
    } else {
      timeStatus = `${item.hours}H :${item.mins}M`;
    }

    temp += `<div class="col-sm-12 col-md-6 col-lg-4 col-xl-3 p-3" id="deviceTemp">
    <div class="tm-notification-item w-100">
        <div class="tm-device-header px-4 py-1">
            <h5>جهاز رقم<b class="text-warning border-bottom border-danger mx-4"> ${item.index}</b></h5>
            <h5 class="text-success">${item.name}</h5>
            <i class="fab fa-playstation"></i>
        </div>
        <div class="media-body">
            <div
                class="tm-bg-gray m-3 rounded d-flex justify-content-center align-items-center">
                <!-- <i class="fas fa-toggle-on text-success d-none"></i>
                <i class="fas fa-toggle-off text-danger"></i> -->
                <p class="my-0 px-2" id="timeStatus">${timeStatus}</p>
            </div>
            <div class="h5 py-1 px-5 d-flex justify-content-around" dir="ltr" id="time">
                <span>${item.hoursCount}</span>:<span>${item.minsCount}</span>:<span>${item.secsCount}</span>
            </div>
  
            <div class="d-flex justify-content-around py-3">
                <div class="d-flex">
                    <div class="btn-secondary text-white p-1 radius-right text-center" id="players">${players}</div>
                    <a class="btn btn-success text-white py-1 px-3 radius-right-0" id="start">
                        <i class="fas fa-play"></i>
                        بدء
                    </a>
                    <a class="btn btn-danger text-white py-1 px-2 radius-right-0 d-none"
                        id="stop">
                        <i class="fas fa-pause"></i>
                        ايقاف
                    </a>
                </div>
                <a class="btn btn-warning text-white py-1 px-2">
                    <i class="fas fa-times"></i>
                    انهاء
                </a>
                <a class="btn btn-info" href="">
                    <i class="fas fa-coffee"></i>
                    <!-- <i class="fas fa-ellipsis-v"></i> -->
                </a>
            </div>
            <button class="w-100 btn btn-primary">
                <i class="far fa-handshake"></i>
                محاسبة الان
            </button>
        </div>
    </div>
  </div>`;
  });
  devices.innerHTML = temp;
}

// stopwatch
function stopwatch() {
  let devicesTemp = document.querySelectorAll("#deviceTemp");

  devicesTemp.forEach((temp) => {
    let time = temp.querySelector("#time");
    let startBtn = temp.querySelector("#start");
    let stopBtn = temp.querySelector("#stop");

    let timeObj = {
      hour: time.children[0].innerText,
      min: time.children[1].innerText,
      sec: time.children[2].innerText,
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
      sessionStorage.setItem("timer", JSON.stringify(timeObj));

      // timeContainer.forEach((timer) => {
      console.log(timeObj);
      time.children[0].innerText = timeObj.hour;
      time.children[1].innerText = timeObj.min;
      time.children[2].innerText = timeObj.sec;
      // });
    }

    let timeStart;
    startBtn.addEventListener("click", function () {
      this.classList.add("d-none");
      stopBtn.classList.remove("d-none");
      sessionStorage.className = "d-none";

      timeStart = setInterval(setTime, 1000);
      console.log(timeObj);
    });

    $(document).ready(function () {
      console.log(temp);
      if (sessionStorage.getItem("timer") !== null) {
        timeObj = JSON.parse(sessionStorage.getItem("timer"));
        console.log(timeObj);
        time.children[0].innerText = timeObj.hour;
        time.children[1].innerText = timeObj.min;
        time.children[2].innerText = timeObj.sec;

        startBtn.classList.add(sessionStorage.className);
        stopBtn.classList.remove(sessionStorage.className);
        setInterval(setTime, 1000);
      }
    });

    stopBtn.addEventListener("click", function () {
      this.classList.add("d-none");
      startBtn.classList.remove("d-none");
      sessionStorage.removeItem("className");
      clearInterval(timeStart);
    });
  });
}

// set correct syntax time
// if (device.hours == 0 && device.mins == 0) {
//   device.hours = "00";
//   device.mins = "00";
// } else if (device.hours < 10 || device.mins < 10) {
//   device.hours = "0" + device.hours;
//   device.mins = "0" + device.mins;
// }
