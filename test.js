let timeJson = [
    ["08:00", "12:00"], // morning rush
    ["16:00", "21:00"], //evening rush
];

function Test() {
    let currentMinutes = new Date().getMinutes();
    let currentHours = new Date().getHours();
    let minutes = currentMinutes.toString().padStart(2,"0")
    let hours = currentHours.toString()
    let isUnderTime = [];

    let currentTime =  hours.toString()+ ":" .concat(minutes)

    timeJson.map(value => {
        if(value[0] <= currentTime && currentTime <= value[1]){
            isUnderTime.push(true)
        }else{
            isUnderTime.push(false)
        }
    })


    console.log(isUnderTime);
    

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
Test()