console.log("Extension ready!");
let passwordBox = document.querySelectorAll('input[type=password]');
//const button = document.createElement("button");
//button.id = "toppings";
//const url = chrome.extension.getURL("/images/icon.PNG")
//button.style['background-image'] = "url('https://i.imgur.com/zvSjtsL.png')";
//button.style.setProperty("background-image", "url('https://i.imgur.com/zvSjtsL.png')", "important");
//button.style['background-size'] = 'cover';
//button.style['border'] = 'none';
//button.style['border-radius'] = '5px';
//button.style['cursor'] = 'pointer';
//button.title = "Add password toppings";
//button.style['position'] = "relative";
//button.style['z-index'] = "-1";
//button.style.backgroundColor = "#FF00FF";

var focusedField = null;
var enable = 0;

for (elt of passwordBox) {
    var parent = elt.parentElement;
    //parent.style['background-color'] = '#FF00FF';
    //button.style.width = elt.style.width;
    //button.style.height = elt.style.width;
    //button.style['top'] = elt.style.top;
    //button.style.width = "25px";
    //button.style.height = "25px";
    //parent.appendChild(button);
    elt.addEventListener('input', (e) => {
        console.log("Focused field set");
        focusedField = elt;
        if(elt.value.length > 0){
            enable = 1;
        }
        else{
            enable = 0;
        }
        //let msg = {
            //txt: enable
        //}
        //chrome.runtime.sendMessage(msg);
    });
}

//Listen for user to add topping and make sure password has been set
chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(message, sender, sendResponse){
    console.log(message.txt);
    if(focusedField !== null && enable == 1){
        focusedField.value += message.txt;
    }

    sendResponse(enable);
}