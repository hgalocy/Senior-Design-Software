const { ipcRenderer } = require("electron");
const fs = require("fs");

//make arduino connection
const connectionBtn = document.getElementById("connectionBtn");
connectionBtn.addEventListener("click", function(){
    if(ipcRenderer.sendSync("connect arduino", "") == true){
            connectionBtn.innerHTML = "Connection:<br>\Connected :)"
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
        dropDowns[i].getElementsByTagName("ul")[0].classList.toggle("show");
    });
}
//display chosen option on button
const dropOptions = document.getElementsByTagName("li");
for(let i=0; i<dropOptions.length;i++){
    dropOptions[i].addEventListener('click' , function(){
        dropOptions[i].closest('div').getElementsByTagName("button")[0].innerHTML = dropOptions[i].innerHTML;
    } ) ; 
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