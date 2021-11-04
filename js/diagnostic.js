const genSigBtn = document.getElementById("genSigBtn");
const dropBtns = document.getElementsByClassName("dropbtn");
const freqInput = document.getElementById("freqInput");
const ampInput = document.getElementById("ampInput");
genSigBtn.addEventListener("click", function(){
    for(let i=0; i<dropBtns.length;i++){
        if(dropBtns[i].style.background != "green"){
            //display error message becasue not all fields are filled out
            document.getElementById("errorMessage").style.visibility = "visible";
            return;
        }
    }
    //TODO: apply ranges for freqinput and ampinput
    let arg = {
        input : document.getElementById("channelDropBtn").innerHTML,
        mvrms : document.getElementById("ampInput").value,
        freq : document.getElementById("freqInput").value
    };
    ipcRenderer.send("sigOn", arg); //
    document.getElementById("errorMessage").style.visibility = "hidden";
});

ipcRenderer.on("sigOn command done", (event, arg) =>{
    document.getElementById("signalIndicator").innerHTML = "Generating Signal "+ arg['mvrms']+"mVrms pp"+" at "+arg['freq']+"Hz";
    document.getElementById("signalIndicator").style.visibility = "visible";
});

