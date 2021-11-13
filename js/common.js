//const worker = new Worker('../js/worker.js');
let dropDownColor = getComputedStyle(document.documentElement).getPropertyValue('--input-button');

//check if arduino connected on page load
window.onload = function checkIfConnected(){
    if(ipcRenderer.sendSync("already connected", "") == true){
        connectionBtn.innerHTML = "Connection:<br>\Connected :)";
        document.getElementsByClassName("green-button")[0].style.backgroundColor = "var(--green)";
        for( let i = 0; i< document.getElementsByClassName("dropbtn").length; i++){
            document.getElementsByClassName("dropbtn")[i].style.backgroundColor = "var(--input-button";
        }
    }
}

//make arduino connection
const connectionBtn = document.getElementById("connectionBtn");
connectionBtn.addEventListener("click", function(){
    if(ipcRenderer.sendSync("connect arduino", "") == true){
        connectionBtn.innerHTML = "Connection:<br>\Connected :)";
        document.getElementsByClassName("green-button")[0].style.backgroundColor = "var(--green)";
        for( let i = 0; i< document.getElementsByClassName("dropbtn").length; i++){
            document.getElementsByClassName("dropbtn")[i].style.backgroundColor = "var(--input-button";
        }
        if(document.getElementById("errorMessage1").style.visibility == "visible"){
            document.getElementById("errorMessage1").style.visibility = "hidden";
        }
    }
});

//open about popup
const aboutBtn = document.getElementById("aboutBtn");
aboutBtn.addEventListener("click", function(){
    var arg = "aboutWindow";
    //send message to main process to open about window
    ipcRenderer.send("openWindow", arg);
});

//drop down stuff
//open options when button clicked
const dropDowns = document.getElementsByClassName("dropdown");
for(let i=0; i<dropDowns.length;i++){
    dropDowns[i].getElementsByTagName("button")[0].addEventListener("click", function() {
        if (connectionBtn.innerHTML != "Connection:<br>\Connected :)"){ //check if arduino connected and if signal is being generated
            document.getElementById("errorMessage1").style.visibility = "visible";
        }
        else{
            document.getElementById("errorMessage1").style.visibility = "hidden";
            dropDowns[i].getElementsByTagName("ul")[0].classList.toggle("show");
        }
    });
}
//display chosen option on button
const dropOptions = document.getElementsByTagName("li");
for(let i=0; i<dropOptions.length;i++){
    dropOptions[i].addEventListener('click' , function(){
        dropOptions[i].closest('div').getElementsByTagName("button")[0].innerHTML = dropOptions[i].innerHTML;
        let arg = {
            dropName : (dropOptions[i].parentElement.parentElement.parentElement.parentElement.querySelector(".drop-name").innerHTML.slice(0, -1)),
            dropSetting : "beans" //tmp
        };
        dropBtn = dropOptions[i].parentElement.parentElement.querySelector('.dropbtn')
        switch(dropOptions[i].innerHTML){
            case "Counter-Clockwise": //change color to yellow, send arduino command
                turnColor(dropBtn,"orange")
                arg['dropSetting'] = "CCW";
                ipcRenderer.send("potSetting", arg);
                break;
            case "Clockwise": //change color to yellow, send arduino command
                turnColor(dropBtn,"orange")
                arg['dropSetting'] = "CW";
                ipcRenderer.send("potSetting", arg);
                break;
            case "Middle": //change color to yellow, send arduino command
                turnColor(dropBtn,"orange")
                arg['dropSetting'] = "MID";
                ipcRenderer.send("potSetting", arg);
                break;
            case "ON": //change color to yellow, send arduino command
                turnColor(dropBtn,"orange")
                arg['dropSetting'] = "On";
                ipcRenderer.send("presSetting", arg);
                break;
            case "OFF": //change color to yellow, send arduino command
                turnColor(dropBtn,"orange")
                arg['dropSetting'] = "Off";
                ipcRenderer.send("presSetting", arg);
                break;
            case "Aux": //change color to green
                turnColor(dropBtn,"green")
                break;
            case "Guitar": //change color to green
                turnColor(dropBtn,"green")
                break;
            default:
                console.log("error; invalid selection");
                turnColor(dropBtn,dropDownColor)
        }
    }); 
}
//close drop down options
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

//change element background-color to color
function turnColor(element, color){
    element.style.background = color;
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
          resolve(color);
        },1);
    });
}


ipcRenderer.on("dropdown command done", (event, arg) =>{
    let dropBtnNames = document.querySelectorAll(".drop-name");
    for(let i=0; i<dropBtnNames.length;i++){
        if(dropBtnNames[i].innerHTML == arg['dropName']+":"){
            turnColor(dropBtnNames[i].parentElement.querySelector(".dropbtn"),"green")
        }
    }
});

