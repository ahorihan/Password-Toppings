document.addEventListener('DOMContentLoaded', async () => {
    const target = document.getElementById("desc");
    const container = document.getElementById("container");
    const btn = document.getElementById("about");
    const addBtn = document.getElementById("addButton");
    const tpgInp = document.getElementById("toppingInput");
    const tpgLbl = document.getElementById("toppingLabel");
    const errMsg = document.getElementById("failedInput");
    const errMsg2 = document.getElementById("failedInput2");
    const errMsg3 = document.getElementById("failedInput3");
    const success = document.getElementById("toppingAdded");

    errMsg.style.display = "none";
    errMsg2.style.display = "none";
    errMsg3.style.display = "none";
    success.style.display = "none";

    tpgInp.focus();

    var foodList = {};
    var mappings = "%`[&#:=*~;]{?_(@/!$}->^)+\"'";

    fetch("/resources/foodList.txt")
	.then((response) => {
  		return response.text();
	})
	.then((text) => {
  		temp = text.split("\n");
        for(elt of temp){
            elt = elt.replace('\r', '')
            foodList[elt] = 1;
        }
	});

    console.log(foodList);

    //Hide topping options until password is entered
    //addBtn.style.display = "none";
    //tpgInp.style.display = "none";
    //tpgLbl.style.display = "none";

    btn.onclick = function () {
        if (target.style.display == "block") {
            target.style.display = "none";
            container.style.height = "200px"
        }else{
            target.style.display = "block";
            container.style.height = "550px";
        }
    }

    tpgInp.addEventListener("keyup", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            addBtn.click();
        }
    });

    // chrome.runtime.onMessage.addListener(gotMessage);

    // function gotMessage(message, sender, sendResponse){
    //     console.log(message.txt);
    //     if(message.txt == 1){
    //         addBtn.style.display = "flex";
    //         tpgInp.style.display = "flex";
    //         tpgLbl.style.display = "flex";
    //     }
    //     else{
    //         addBtn.style.display = "none";
    //         tpgInp.style.display = "none";
    //         tpgLbl.style.display = "none";
    //     }
    // }

    var topping = "";
    var enc = "";

    function checkAndEncrypt(tpg){ //Returns 0 on success, otherwise returns an error number
        tpg = tpg.toLowerCase();
        enc = "";
        if(tpg.length < 1){return 1}
        else if(!(tpg in foodList)){return 2}
        for(let i = 0; i < tpg.length; i++){
            console.log(tpg.charCodeAt(i));
            if(tpg.charCodeAt(i)-97 >= 0){
                enc += mappings.charAt(tpg.charCodeAt(i)-97);
            }
            else{
                enc += mappings.charAt(26);
            }
        }
        return 0;
    }

    tpgInp.addEventListener('input', (e) => {
        topping = tpgInp.value;
        success.style.display = "none";
    });

    //Add topping to password
    addBtn.onclick = function () {
        tpgInp.value = ""
        let params = {
            active: true,
            currentWindow: true
        }
        chrome.tabs.query(params, function(tabs){
            valid = checkAndEncrypt(topping);

            //if(valid == 0){
                let msg = {
                    txt: enc
                }
                chrome.tabs.sendMessage(tabs[0].id, msg, function(response){
                    console.log(response);
                    if(response == 0 || response == undefined){
                        errMsg.style.display = "block";
                        errMsg2.style.display = "none";
                        errMsg3.style.display = "none";
                        success.style.display = "none";
                    }
                    else if(valid == 1){
                        errMsg2.style.display = "block";
                        errMsg.style.display = "none";
                        errMsg3.style.display = "none";
                        success.style.display = "none";
                    }
                    else if(valid == 2){
                        errMsg3.style.display = "block";
                        errMsg.style.display = "none";
                        errMsg2.style.display = "none";
                        success.style.display = "none";
                    }
                    else{
                        errMsg.style.display = "none";
                        errMsg2.style.display = "none";
                        errMsg3.style.display = "none";
                        success.style.display = "block";
                }
            });
            //}
        });
    }
});