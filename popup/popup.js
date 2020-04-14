let data = false;
$("#btn").click(() =>{
    if(data===false){
        $("#btn").text("stop");
    }else $("#btn").text("start");
    data=!data;

    chrome.runtime.sendMessage({
        data: data
    }, () => {
    });
});


