document.addEventListener('DOMContentLoaded', async () => {
    const target = document.getElementById("desc");
    const btn = document.getElementById("about");
    const addBtn = document.getElementById("addButton");
    const tpgInp = document.getElementById("toppingInput");
    const tpgLbl = document.getElementById("toppingLabel");
    const errMsg = document.getElementById("failedInput");
    const errMsg2 = document.getElementById("failedInput2");
    const success = document.getElementById("toppingAdded");

    errMsg.style.display = "none";
    errMsg2.style.display = "none";
    success.style.display = "none";

    var foodList = [];

    fetch("/resources/foodList.txt")
	.then((response) => {
  		return response.text();
	})
	.then((text) => {
  		temp = text.split("\n");
        for(elt of temp){
            elt = elt.replace('\r', '')
            foodList.push(elt);
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
        }else{
            target.style.display = "block";
        }
    }

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

    function checkAndEncrypt(tpg){ //Returns 0 on success, otherwise returns an error number
        if(tpg.length < 1){return "1"}
        return 0;
    }

    tpgInp.addEventListener('input', (e) => {
        topping = tpgInp.value;
        success.style.display = "none";
    });

    //Add topping to password
    addBtn.onclick = function () {
        let params = {
            active: true,
            currentWindow: true
        }
        chrome.tabs.query(params, function(tabs){
            let msg = {
                txt: topping
            }
            valid = checkAndEncrypt(topping);
            if(valid == 0){
                chrome.tabs.sendMessage(tabs[0].id, msg, function(response){
                    console.log(response);
                    if(response == 0){
                        errMsg.style.display = "block";
                        errMsg2.style.display = "none";
                    }
                    else{
                        errMsg.style.display = "none";
                        errMsg2.style.display = "none";
                        success.style.display = "block";
                }
            });
            }
            else if(valid == 1){
                errMsg2.style.display = "block";
                errMsg.style.display = "none";
            }
        });
    }
});