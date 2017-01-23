
/**
 *  TODO
 *  Task 1:
 *  Encapsulate AJAX call logic into Promise based approach
 *
 *  Task 2:
 *  Add FrontEnd validations to the application
 *
 *  Task 3:
 *  Write TestCases using Jasmine
 *
 * */
function makeAjaxCall(url,respondFn){

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            respondFn(response);
            //document.getElementById("demo").innerHTML = this.responseText;
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}

function initCarousel(){
    var getCarsUrl = "/api/getcars";
    var allCars = [];


    function getAllCars(){


    }

    function populateTable(result){
        var tbody = document.getElementById('table-body');
        for(var i=0; i<result.length; i++){
            var newTr = document.createElement("tr");
            tbody.appendChild(newTr);
            var newSpan = document.createElement("td");

        }
    }

}

