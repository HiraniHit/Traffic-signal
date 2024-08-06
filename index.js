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
let stop = false;
let allArrow = document.querySelectorAll(".arrow");
let arrow1 = document.querySelectorAll(".street-1 .arrow");
let arrow2 = document.querySelectorAll(".street-2 .arrow");
let arrow3 = document.querySelectorAll(".street-3 .arrow");
let arrow4 = document.querySelectorAll(".street-4 .arrow");
let isUnderTime = [];

let timeJson = [
    [8.0, 11.0], // morning rush
    [16.0, 21.0], //evening rush
    // [14.0, 17.0],
];
function checkTime() {
    let currentMinutes = new Date().getMinutes();
    let currentHours = new Date().getHours();
    let currentTime = currentHours.toString() + ".".concat(currentMinutes);
    let realTime = parseFloat(currentTime);
    isUnderTime = [];

    timeJson.map((value) => {
        if (value[0] <= realTime && realTime <= value[1]) {
            isUnderTime.push(true);
        } else {
            isUnderTime.push(false);
        }
    });

    if (!isUnderTime.includes(true)) {
        yellowLight.forEach((value) => {
            value.classList.add("yellow");
        });
        let redLite = document.querySelectorAll(".red");
        redLite.forEach((value) => value.classList.remove("red"));

        return false;
    } else {
        return true;
    }
}

function extraTime(timer) {
    let time = parseInt(totalTime.value);

    let extraTime = time - Math.floor(time / 4) + 3;
    console.log(extraTime);

    extraTimeCountDown = setInterval(() => {
        if (extraTime > -1) {
            timer.textContent = extraTime;
            extraTime--;
            if (extraTime == 0) {
                timer.textContent = "Go";
            }
        }
    }, 1000);
}

async function timeDivider() {
    let currentMinutes = new Date().getMinutes();
    let currentHours = new Date().getHours();
    let currentTime = currentHours.toString() + ".".concat(currentMinutes);
    let realTime = parseFloat(currentTime);
    let time = parseInt(totalTime.value);

    if (isNaN(time) || time <= 0) {
        alert("Please enter a valid total time.");
        return;
    }

    timeJson.map((value) => {
        if (value[0] <= realTime && realTime <= value[1]) {
            isUnderTime.push(true);
        } else {
            isUnderTime.push(false);
        }
    });

    if (!isUnderTime.includes(true)) {
        yellowLight.forEach((value) => {
            value.classList.add("yellow");
        });
        return;
    }

    let count1 = Math.floor(time / 4);
    let count2 = Math.floor(time / 4);
    let count3 = Math.floor(time / 4);
    let count4 = Math.floor(time / 4);

    function setGreen(lights, arrow) {
        lights.forEach((light) => {
            if (light.classList.contains("light-green")) {
                light.classList.add("green");
            }
            light.classList.remove("red");
        });

        if (arrow) {
            arrow.forEach((value) => {
                value.style.color = "white";
            });
        }
    }

    function setRed(lights, arrow) {
        lights.forEach((light) => {
            if (light.classList.contains("light-red")) {
                light.classList.add("red");
            }
            light.classList.remove("green");
        });

        if (arrow) {
            arrow.forEach((value) => {
                if (!value.classList.contains("left")) {
                    value.style.color = "rgb(20,20,20)";
                }
            });
        }
    }

    timer1 = await setInterval(() => {
        if (count1 >= 1) {
            setGreen(lights1, arrow1);
            setRed(lights2, arrow2);
            setRed(lights3, arrow3);
            setRed(lights4, arrow4);
            time1.textContent = count1;
            count1--;
        } else {
            setRed(lights1, arrow1);
            time1.textContent = "stop";
            extraTime(time1);
            console.log(time1);

            clearInterval(timer1);
            timer2 = setInterval(() => {
                if (count2 >= 1) {
                    setGreen(lights2, arrow2);
                    setRed(lights3, arrow3);
                    setRed(lights4, arrow4);
                    time2.textContent = count2;
                    count2--;
                } else {
                    time2.textContent = "stop";
                    extraTime(time2);
                    setRed(lights2, arrow2);
                    clearInterval(timer2);
                    timer3 = setInterval(() => {
                        if (count3 >= 1) {
                            setGreen(lights3, arrow3);
                            setRed(lights4, arrow4);
                            time3.textContent = count3;
                            count3--;
                        } else {
                            time3.textContent = "stop";

                            extraTime(time3);
                            setRed(lights3, arrow3);
                            clearInterval(timer3);

                            timer4 = setInterval(() => {
                                if (count4 >= 1) {
                                    setGreen(lights4, arrow4);
                                    time4.textContent = count4;
                                    count4--;
                                } else {
                                    time4.textContent = "stop";

                                    extraTime(time4);
                                    setRed(lights4, arrow4);
                                    clearInterval(timer4);
                                    if (
                                        count1 == 0 &&
                                        count2 == 0 &&
                                        count3 == 0 &&
                                        count4 == 0
                                    ) {
                                        if (checkTime()) {
                                            timeDivider();
                                        } else {
                                            allArrow.forEach(
                                                (value) =>
                                                    (value.style.color =
                                                        "white")
                                            );
                                            time1.textContent = "Go";
                                            time2.textContent = "Go";
                                            time3.textContent = "Go";
                                            time4.textContent = "Go";
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
        if (extraTime == 0) {
            timer.textContent = "Go";
        }
    }, 1000);
}

async function ratioWIseTimeDivider() {
    let time = parseInt(totalTime.value);
    let ratioCount = null;
    let ratioInput = document.querySelectorAll(".ratio");
    let blankInput = [];
    let fillInput = [];
    let currentMinutes = new Date().getMinutes();
    let currentHours = new Date().getHours();
    let currentTime = currentHours.toString() + ".".concat(currentMinutes);
    let realTime = parseFloat(currentTime);

    timeJson.map((value) => {
        if (value[0] <= realTime && realTime <= value[1]) {
            isUnderTime.push(true);
        } else {
            isUnderTime.push(false);
        }
    });

    if (!isUnderTime.includes(true)) {
        yellowLight.forEach((value) => {
            value.classList.add("yellow");
        });
        return;
    }

    ratioInput.forEach((value) => {
        if (value.value != undefined && value.value != "") {
            ratioCount += parseInt(value.value);
            fillInput.push(value);
        }
        if (value.value == "") {
            blankInput.push(value);
        }
    });
    console.log(ratioCount);
    console.log("fill", fillInput.length);
    console.log("blank", blankInput.length);
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

    function setGreen(lights, arrow) {
        lights.forEach((light) => {
            if (light.classList.contains("light-green")) {
                light.classList.add("green");
            }
            light.classList.remove("red");
        });

        if (arrow) {
            arrow.forEach((value) => {
                value.style.color = "white";
            });
        }
    }

    function setRed(lights, arrow) {
        lights.forEach((light) => {
            if (light.classList.contains("light-red")) {
                light.classList.add("red");
            }
            light.classList.remove("green");
        });

        if (arrow) {
            arrow.forEach((value) => {
                if (!value.classList.contains("left")) {
                    value.style.color = "rgb(20,20,20)";
                }
            });
        }
    }

    timer1 = await setInterval(() => {
        if (modifyCount1 >= 1) {
            setGreen(lights1, arrow1);
            setRed(lights2, arrow2);
            setRed(lights3, arrow3);
            setRed(lights4, arrow4);
            time1.textContent = modifyCount1;
            modifyCount1--;
        } else {
            console.log(modifyCount1);
            time1.textContent = "stop";
            extraTimeForRatio(time1, remainingTime1);
            setRed(lights1, arrow1);
            clearInterval(timer1);
            timer2 = setInterval(() => {
                if (modifyCount2 >= 1) {
                    setGreen(lights2, arrow2);
                    setRed(lights3, arrow3);
                    setRed(lights4, arrow4);
                    time2.textContent = modifyCount2;
                    modifyCount2--;
                } else {
                    console.log(modifyCount2);
                    time2.textContent = "stop";
                    extraTimeForRatio(time2, remainingTime2);
                    setRed(lights2, arrow2);
                    clearInterval(timer2);
                    timer3 = setInterval(() => {
                        if (modifyCount3 >= 1) {
                            setGreen(lights3, arrow3);
                            setRed(lights4, arrow4);
                            time3.textContent = modifyCount3;
                            modifyCount3--;
                        } else {
                            console.log(modifyCount3);
                            extraTimeForRatio(time3, remainingTime3);
                            time3.textContent = "stop";
                            setRed(lights3, arrow3);
                            clearInterval(timer3);
                            timer4 = setInterval(() => {
                                if (modifyCount4 >= 1) {
                                    setGreen(lights4, arrow4);
                                    time4.textContent = modifyCount4;
                                    modifyCount4--;
                                } else {
                                    console.log(modifyCount4);
                                    extraTimeForRatio(time4, remainingTime4);
                                    time4.textContent = "stop";
                                    setRed(lights4, arrow4);
                                    clearInterval(timer4);
                                    if (
                                        modifyCount1 == 0 &&
                                        modifyCount2 == 0 &&
                                        modifyCount3 == 0 &&
                                        modifyCount4 == 0
                                    ) {
                                        if (checkTime()) {
                                            ratioWIseTimeDivider();
                                        } else {
                                            allArrow.forEach(
                                                (value) =>
                                                    (value.style.color =
                                                        "white")
                                            );
                                            time1.textContent = "Go";
                                            time2.textContent = "Go";
                                            time3.textContent = "Go";
                                            time4.textContent = "Go";
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
