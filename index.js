let totalTime = document.querySelector(".total-time");
let allLight1 = document.querySelector(".street-1");
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
let inputStreet1 = document.querySelector(".input-street-1");
let inputStreet2 = document.querySelector(".input-street-2");
let inputStreet3 = document.querySelector(".input-street-3");
let inputStreet4 = document.querySelector(".input-street-4");

let stop = false;
console.log(allLight1);

let demo = 100;
console.log((demo / 100) * 40);

async function timeDivider() {
    let ratioCount = null;
    let ratioInput = document.querySelectorAll(".ratio");
    
    ratioInput.forEach((value) => {
        if (value.value != undefined && value.value != "") {
            ratioCount += parseInt(value.value);
        }
    });
    console.log(ratioCount);
    
    let time = parseInt(totalTime.value);
    console.log(time / 25);
    let modifyCount1 = time / (100 * parseInt(inputStreet1.value));
    let modifyCount2 = time / (100 * parseInt(inputStreet2.value));
    let modifyCount3 = time / (100 * parseInt(inputStreet3.value));
    let modifyCount4 = time / (100 * parseInt(inputStreet4.value));
console.log(modifyCount1);

    if (isNaN(time) || time <= 0) {
        alert("Please enter a valid total time.");
        return;
    }
    let count1 = modifyCount1 || Math.floor(time / 4);
    let count2 = modifyCount2 || Math.floor(time / 4);
    let count3 = modifyCount3 || Math.floor(time / 4);
    let count4 = modifyCount4 || Math.floor(time / 4);

    function setGreen(lights) {
        lights.forEach((light) => {
            if (light.classList.contains("light-green")) {
                light.classList.add("green");
            }
            light.classList.remove("red");
        });
    }

    function setRed(lights) {
        lights.forEach((light) => {
            if (light.classList.contains("light-red")) {
                light.classList.add("red");
            }
            light.classList.remove("green");
        });
    }

    timer1 = await setInterval(() => {
        if (count1 > 0) {
            setGreen(lights1);
            setRed(lights2);
            setRed(lights3);
            setRed(lights4);
            time1.textContent = count1;
            count1--;
        } else {
            console.log(count1);

            time1.textContent = "stop";
            setRed(lights1);
            clearInterval(timer1);

            timer2 = setInterval(() => {
                if (count2 > 0) {
                    setGreen(lights2);
                    setRed(lights3);
                    setRed(lights4);
                    time2.textContent = count2;
                    count2--;
                } else {
                    console.log(count2);

                    time2.textContent = "stop";
                    setRed(lights2);
                    clearInterval(timer2);

                    timer3 = setInterval(() => {
                        if (count3 > 0) {
                            setGreen(lights3);
                            setRed(lights4);
                            time3.textContent = count3;
                            count3--;
                        } else {
                            console.log(count3);

                            time3.textContent = "stop";
                            setRed(lights3);

                            clearInterval(timer3);

                            timer4 = setInterval(() => {
                                if (count4 > 0) {
                                    setGreen(lights4);
                                    time4.textContent = count4;
                                    count4--;
                                } else {
                                    console.log(count4);

                                    time4.textContent = "stop";
                                    setRed(lights4);
                                    clearInterval(timer4);
                                    if (
                                        count1 == 0 &&
                                        count2 == 0 &&
                                        count3 == 0 &&
                                        count4 == 0
                                    ) {
                                        timeDivider();
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
