

function getPromise(url, type, inputData){

    function makeAjaxCall(url,respondFn,type,data){

        var xhttp = new XMLHttpRequest(), reqType, postData;
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                respondFn(JSON.parse(this.responseText));
                //document.getElementById("demo").innerHTML = this.responseText;
            }
        };
        if(!type){
            reqType = "GET";
        }else{
            reqType = type.toUpperCase();
            //Send the proper header information along with the request
        }
        xhttp.open(reqType, url, true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
        postData = data || {};
        xhttp.send(postData);
    }

    var p = new Promise(function(successFn, rejectFn){
        try {
            makeAjaxCall(url, function(data){
                successFn(data);
            }, type, inputData);
        } catch(e){
            rejectFn('error: ' + e);
        } finally {
            // code to be execute on completion (either success/fail);
        }
    });
    return p;
}

