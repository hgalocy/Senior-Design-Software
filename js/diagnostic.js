const genSigBtn = document.getElementById("genSigBtn");
const dropBtns = document.getElementsByClassName("dropbtn");
const freqInput = document.getElementById("freqInput");
const ampInput = document.getElementById("ampInput");
const offSigBtn = document.getElementById("offSigBtn");
let sigOn = 0; //=1 when signal is generated, 0 when off
genSigBtn.addEventListener("click", function(){
    if (connectionBtn.innerHTML != "Connection:<br>\Connected :)"){ //check if arduino connected before starting tests
        //go through each test sequentially
        document.getElementById("errorMessage1").style.visibility = "visible";
        return;
    }
    else{
        document.getElementById("errorMessage1").style.visibility = "hidden";
        for(let i=0; i<dropBtns.length;i++){
            if(dropBtns[i].style.background != "green"){
                //display error message becasue not all fields are filled out
                document.getElementById("errorMessage2").style.visibility = "visible";
                return;
            }
        }
        let arg = {
            input : document.getElementById("channelDropBtn").innerHTML,
            mvrms : Number(document.getElementById("ampInput").value),
            freq : Number(document.getElementById("freqInput").value)
        };
        ipcRenderer.send("sigOn", arg); //send message to main to worker process to commmand arduino
        document.getElementById("errorMessage2").style.visibility = "hidden";
        /*for( let i = 0; i< document.getElementsByClassName("dropbtn").length; i++){
            document.getElementsByClassName("dropbtn")[i].style.backgroundColor = "var(--gray-green";
        }
        freqInput.readOnly = true;
        ampInput.readOnly = true;
        freqInput.style.backgroundColor = "var(--dark-text)";
        ampInput.style.backgroundColor = "var(--dark-text)";*/
        offSigBtn.style.backgroundColor = "var(--red)";
        sigGen = 1;
    }
});

offSigBtn.addEventListener("click", function (){
    if(offSigBtn.style.backgroundColor != "var(--red)"){
        console.log("no signal to turn off")
    }
    else{
        let arg = "sigOff both channels"
        ipcRenderer.send("sigOff", arg);
        offSigBtn.style.backgroundColor = "var(--text-area";
    }
})

ipcRenderer.on("sigOn command done", (event, arg) =>{ //display on label what signal is generated
    document.getElementById("signalIndicator").innerHTML = "Generating Signal "+ arg['mvrms']+"mVrms pp"+" at "+arg['freq']+"Hz";
    document.getElementById("signalIndicator").style.visibility = "visible";
});
ipcRenderer.on("sigOff command done", (event, arg) =>{ //signal is off so hide the label saying a signal is on
    document.getElementById("signalIndicator").style.visibility = "hidden";
    sigGen = 0;
    /*
    for( let i = 0; i< document.getElementsByClassName("dropbtn").length; i++){
        document.getElementsByClassName("dropbtn")[i].style.backgroundColor = "green";
    }
    freqInput.style.backgroundColor = "var(--input-button)";
    ampInput.style.backgroundColor = "var(--input-button)";
    freqInput.readOnly = false;
    ampInput.readOnly = false;*/
});

