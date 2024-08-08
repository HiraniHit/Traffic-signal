let totalTime = document.querySelector(".total-time");
let allLight1 = document.querySelector(".street-1");
let timeDisplay = document.querySelectorAll(".time-counter");
let time1 = document.querySelector(".time-1");
let time2 = document.querySelector(".time-2");
let time3 = document.querySelector(".time-3");
let time4 = document.querySelector(".time-4");
let timer1;
let timer2;
let timer3;
let timer4;
let lights1 = document.querySelectorAll(".street-1 .box");
let lights2 = document.querySelectorAll(".street-2 .box");
let lights3 = document.querySelectorAll(".street-3 .box");
let lights4 = document.querySelectorAll(".street-4 .box");
let yellowLight = document.querySelectorAll(`.light-yellow`);
let inputStreet1 = document.querySelector(".input-street-1");
let inputStreet2 = document.querySelector(".input-street-2");
let inputStreet3 = document.querySelector(".input-street-3");
let inputStreet4 = document.querySelector(".input-street-4");
let extraTimeCountDown;
let start;
let stop;
let allArrow = document.querySelectorAll(".arrow");
let arrow1 = document.querySelectorAll(".street-1 .arrow");
let arrow2 = document.querySelectorAll(".street-2 .arrow");
let arrow3 = document.querySelectorAll(".street-3 .arrow");
let arrow4 = document.querySelectorAll(".street-4 .arrow");
let lightRed = document.querySelectorAll(".light-red");
let lightGreen = document.querySelectorAll(".light-green");
let isUnderTime = [];
let timeJson = [
    // ["08:00", "12:07"], // morning rush
    ["18:00", "21:00"], //evening rush
    ["09:20", "09:30"], //demo
    ["09:32", "09:32"],
    ["09:34", "10:40"], //demo
];

// TODO: make website view

setInterval(() => {
    checkTime();
}, 1000);

function checkTime() {
    let currentMinutes = new Date().getMinutes();
    let currentHours = new Date().getHours();
    let minutes = currentMinutes.toString().padStart(2, "0");
    let hours = currentHours.toString().padStart(2, "0");
    isUnderTime = [];
    let currentTime = hours.toString() + ":".concat(minutes);

    timeJson.map((value) => {
        if (value[0] <= currentTime && currentTime <= value[1]) {
            isUnderTime.push(true);
        } else {
            isUnderTime.push(false);
        }
    });

    if (!isUnderTime.includes(true)) {
        yellowLight.forEach((value) => {
            value.classList.add("yellow");
        });
        allArrow.forEach((item) => (item.style.color = "white"));
        lightGreen.forEach((value) => value.classList.remove("green"));
        lightRed.forEach((value) => value.classList.remove("red"));
        timeDisplay.forEach((value, i) => {
            value.textContent = "Go";
            value.style.opacity = "0";
        });
        stop = false;
        return false;
    } else {
        stop = true;
        let light = document.querySelector(".light-yellow");
        if (
            light.classList.contains("yellow") &&
            light.classList.contains("continue")
        ) {
            timeDisplay.forEach((value) => (value.style.opacity = "1"));
            timeDivider();
        }
        if (
            light.classList.contains("yellow") &&
            light.classList.contains("continue1")
        ) {
            timeDisplay.forEach((value) => (value.style.opacity = "1"));
            ratioWIseTimeDivider();
        }
        return true;
    }
}

function extraTime(timer) {
    let time = parseInt(totalTime.value);
    let realTime = Math.floor(time / 4) * 4;
    let extraTime = realTime - Math.floor(time / 4) + 3;

    extraTimeCountDown = setInterval(() => {
        if (extraTime > -1) {
            timer.textContent = extraTime;
            extraTime--;
            if (extraTime == 0) timer.textContent = "Go";
        }
    }, 1000);
}
function setGreen(lights, arrow, text) {
    lights.forEach((light) => {
        if (light.classList.contains("light-green")) {
            light.classList.add("green");
        }
        light.classList.remove("red");
    });
    if (!stop) {
        lightGreen.forEach((value) => value.classList.remove("green"));
        allArrow.forEach((value) => (value.style.color = "white"));
    } else if (arrow) {
        arrow.forEach((value) => (value.style.color = "white"));
    }

    if (text) {
        text.style.color = "green";
    }
}

function setRed(lights, arrow, text) {
    lights.forEach((light) => {
        if (light.classList.contains("light-red")) light.classList.add("red");
        light.classList.remove("green");
    });
    if (!stop) {
        lightRed.forEach((value) => value.classList.remove("red"));
        allArrow.forEach((value) => (value.style.color = "white"));
    } else if (arrow) {
        arrow.forEach((value) => {
            if (!value.classList.contains("left")) {
                value.style.color = "rgb(20,20,20)";
            }
        });
    }
    if (text) {
        text.style.color = "red";
    }
}
async function timeDivider() {
    start = false;
    yellowLight.forEach((value) => {
        value.classList.remove("yellow");
    });
    timeDisplay.forEach((value) => {
        value.textContent = "Stop";
    });
    time1.textContent = "Go";
    let time = parseInt(totalTime.value);

    if (isNaN(time) || time <= 0) {
        alert("Please enter a valid total time.");
        return;
    }

    if (!checkTime()) {
        return;
    }
    yellowLight.forEach((value) => value.classList.add("continue"));
    let count1 = Math.floor(time / 4);
    let count2 = Math.floor(time / 4);
    let count3 = Math.floor(time / 4);
    let count4 = Math.floor(time / 4);

    timer1 = await setInterval(() => {
        if (count1 >= 1) {
            setGreen(lights1, arrow1, time1);
            setRed(lights2, arrow2, time2);
            setRed(lights3, arrow3, time3);
            setRed(lights4, arrow4, time4);
            time1.textContent = count1;
            count1--;
        } else {
            setRed(lights1, arrow1, time1);
            time1.textContent = "stop";
            extraTime(time1);
            clearInterval(timer1);
            timer2 = setInterval(() => {
                if (count2 >= 1) {
                    setGreen(lights2, arrow2, time2);
                    setRed(lights3, arrow3, time3);
                    setRed(lights4, arrow4, time4);
                    time2.textContent = count2;
                    count2--;
                } else {
                    time2.textContent = "stop";
                    extraTime(time2);
                    setRed(lights2, arrow2, time2);
                    clearInterval(timer2);
                    timer3 = setInterval(() => {
                        if (count3 >= 1) {
                            setGreen(lights3, arrow3, time3);
                            setRed(lights4, arrow4, time4);
                            time3.textContent = count3;
                            count3--;
                        } else {
                            time3.textContent = "stop";
                            extraTime(time3);
                            setRed(lights3, arrow3, time3);
                            clearInterval(timer3);
                            timer4 = setInterval(() => {
                                if (count4 >= 1) {
                                    setGreen(lights4, arrow4, time4);
                                    time4.textContent = count4;
                                    count4--;
                                } else {
                                    time4.textContent = "stop";
                                    extraTime(time4);
                                    setRed(lights4, arrow4, time4);
                                    clearInterval(timer4);
                                    if (
                                        count1 == 0 &&
                                        count2 == 0 &&
                                        count3 == 0 &&
                                        count4 == 0
                                    ) {
                                        if (stop) {
                                            yellowLight.forEach((value) =>
                                                value.classList.remove(
                                                    "continue"
                                                )
                                            );
                                            timeDivider();
                                        } else {
                                            allArrow.forEach(
                                                (value) =>
                                                    (value.style.color =
                                                        "white")
                                            );
                                        }
                                    }
                                }
                            }, 1000);
                        }
                    }, 1000);
                }
            }, 1000);
        }
    }, 1000);
}

function extraTimeForRatio(timer, elapsedTime) {
    let extraTime = elapsedTime + 3;

    extraTimeCountDown = setInterval(() => {
        if (extraTime > -1) {
            timer.textContent = extraTime;
            extraTime--;
        }
        if (extraTime == 0) timer.textContent = "Go";
    }, 1000);
}

async function ratioWIseTimeDivider() {
    yellowLight.forEach((value) => value.classList.add("continue1"));
    yellowLight.forEach((value) => value.classList.remove("yellow"));
    timeDisplay.forEach((value) => (value.textContent = "Stop"));
    time1.textContent = "Go";

    let time = parseInt(totalTime.value);
    let ratioCount = null;
    let ratioInput = document.querySelectorAll(".ratio");
    let blankInput = [];

    ratioInput.forEach((value) => {
        if (value.value != undefined && value.value != "") {
            ratioCount += parseInt(value.value);
        }
        if (value.value == "") blankInput.push(value);
    });
    let obtainTime = time / (100 / ratioCount);
    let modifyCount1 =
        Math.ceil(time / (100 / parseInt(inputStreet1.value))) ||
        Math.floor((time - obtainTime) / blankInput.length);
    let modifyCount2 =
        Math.ceil(time / (100 / parseInt(inputStreet2.value))) ||
        Math.floor((time - obtainTime) / blankInput.length);
    let modifyCount3 =
        Math.ceil(time / (100 / parseInt(inputStreet3.value))) ||
        Math.floor((time - obtainTime) / blankInput.length);
    let modifyCount4 =
        Math.ceil(time / (100 / parseInt(inputStreet4.value))) ||
        Math.floor((time - obtainTime) / blankInput.length);

    let remainingTime1 = time - Math.floor(modifyCount1);
    let remainingTime2 = time - Math.floor(modifyCount2);
    let remainingTime3 = time - Math.floor(modifyCount3);
    let remainingTime4 = time - Math.floor(modifyCount4);

    if (isNaN(time) || time <= 0) {
        alert("Please enter a valid total time.");
        return;
    }

    timer1 = await setInterval(() => {
        if (modifyCount1 >= 1) {
            setGreen(lights1, arrow1, time1);
            setRed(lights2, arrow2, time2);
            setRed(lights3, arrow3, time3);
            setRed(lights4, arrow4, time4);
            time1.textContent = modifyCount1;
            modifyCount1--;
        } else {
            console.log(modifyCount1);
            time1.textContent = "stop";
            extraTimeForRatio(time1, remainingTime1);
            setRed(lights1, arrow1, time1);
            clearInterval(timer1);
            timer2 = setInterval(() => {
                if (modifyCount2 >= 1) {
                    setGreen(lights2, arrow2, time2);
                    setRed(lights3, arrow3, time3);
                    setRed(lights4, arrow4, time4);
                    time2.textContent = modifyCount2;
                    modifyCount2--;
                } else {
                    console.log(modifyCount2);
                    time2.textContent = "stop";
                    extraTimeForRatio(time2, remainingTime2);
                    setRed(lights2, arrow2, time2);
                    clearInterval(timer2);
                    timer3 = setInterval(() => {
                        if (modifyCount3 >= 1) {
                            setGreen(lights3, arrow3, time3);
                            setRed(lights4, arrow4, time4);
                            time3.textContent = modifyCount3;
                            modifyCount3--;
                        } else {
                            console.log(modifyCount3);
                            extraTimeForRatio(time3, remainingTime3);
                            time3.textContent = "stop";
                            setRed(lights3, arrow3, time3);
                            clearInterval(timer3);
                            timer4 = setInterval(() => {
                                if (modifyCount4 >= 1) {
                                    setGreen(lights4, arrow4, time4);
                                    time4.textContent = modifyCount4;
                                    modifyCount4--;
                                } else {
                                    console.log(modifyCount4);
                                    extraTimeForRatio(time4, remainingTime4);
                                    time4.textContent = "stop";
                                    setRed(lights4, arrow4, time4);
                                    clearInterval(timer4);
                                    if (
                                        modifyCount1 == 0 &&
                                        modifyCount2 == 0 &&
                                        modifyCount3 == 0 &&
                                        modifyCount4 == 0
                                    ) {
                                        if (stop) {
                                            yellowLight.forEach((value) =>
                                                value.classList.remove(
                                                    "continue1"
                                                )
                                            );
                                            ratioWIseTimeDivider();
                                        } else {
                                            allArrow.forEach(
                                                (value) =>
                                                    (value.style.color =
                                                        "white")
                                            );
                                        }
                                    }
                                }
                            }, 1000);
                        }
                    }, 1000);
                }
            }, 1000);
        }
    }, 1000);
}
