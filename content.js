console.log("Extension ready!");
var focusedField = null;
var enable = 0;
document.querySelectorAll('input[type=password]').forEach(item => {
    item.addEventListener('focus', (e) => {
        console.log("Focused field set");
        focusedField = item;
        if(item.value.length > 0){
            enable = 1;
        }
        else{
            enable = 0;
        }
    });
    item.addEventListener('input', (e) => {
        console.log("Focused field set");
        focusedField = item;
        if(item.value.length > 0){
            enable = 1;
        }
        else{
            enable = 0;
        }
    });
});
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

//Listen for user to add topping and make sure password has been set
chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(message, sender, sendResponse){
    console.log(focusedField);
    if(focusedField !== null && enable == 1){
        focusedField.value += message.txt;
    }
    else{
        enable = 0;
    }

    sendResponse(enable);
}