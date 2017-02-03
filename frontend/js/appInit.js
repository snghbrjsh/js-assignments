
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



function initCarousel(){
    var getCarsUrl = "/api/getcars";
    var allCars = [], currentCarid="";

    var carEventsManager = new myApp.EventManager();
    carEventsManager.subscribe('remove', removeCarFromTable);
    carEventsManager.subscribe('remove', noop);

    function init(){
        var p = getPromise(getCarsUrl, 'GET');
        p.then(function(data){
            allCars=data;
            if(allCars.length){
                updateCarousel(allCars[0]["_id"]);
            }
            populateTable(allCars);
        });

        var linkCarouselLeft = document.getElementById("link-carousel-left");
        var linkCarouselRight = document.getElementById("link-carousel-right");
        linkCarouselLeft.addEventListener("click",function(){
           moveCarousel(-1);
        });
        linkCarouselRight.addEventListener("click",function(){
            moveCarousel(1);
        });

        var linkAddCar = document.getElementById("link-add-car");
        linkAddCar.addEventListener("click",function(){
           var sectionMain = document.getElementById("section-main");
           sectionMain.style.display = "none";

           var sectionAddCar = document.getElementById("section-add-car");
           sectionAddCar.style.display = "block";

        });

        var linkRemoveAll = document.getElementById("link-remove-all");
        linkRemoveAll.addEventListener("click", function(){
            var blnRemoveConfirm = window.confirm("Are you sure to delete all cars");
            if(blnRemoveConfirm){

              for(var k=allCars.length-1; k>=0; k--){
                  removeCar(allCars[k]._id);
                }
            }
        });

        var btnAddCar = document.getElementById("btn-add-car");
        btnAddCar.addEventListener("click",function(){
            document.getElementById("hidden-carid").value = document.getElementById("car-manf").value.toString().substring(0,3).toUpperCase() + document.getElementById("car-model").value.toString().substring(0,3).toUpperCase();
            var formAddCar = document.getElementById("form-new-car"),
                // inputs = formAddCar.getElementsByTagName("input"),
                // formData = {},
                urlAddCar = "/api/addcar";

            var formData = new FormData(formAddCar);

            //for(var i=0; i< inputs.length; i++){
            //    formData[inputs[i].name] = inputs[i].value;
            //}

            //var formPostdata = JSON.stringify(formData);

            // makeAjaxCall(urlAddCar,function(data){
            //     console.log("Added New Car",data);
            // },"POST",formData);

            var p = getPromise(urlAddCar, 'POST', formData);
            p.then(function(data){
                console.log("Added New Car",data);
            });

        });

    }

    function updateCarousel(carid){
        // var allCars2 = allCars;
        currentCarid = carid;

        var carouselImg = document.getElementsByClassName("carousel-img");
        var carouselSec = document.getElementsByClassName("carousel-section");
        if ( carouselImg && carouselImg.length){
            var carouselImgElement = carouselImg[0].children[0];
            var car = allCars.find(item => item._id === carid);
            if(car) {
                carouselImgElement.src = "images/cars/"+ car.img;
                carouselSec[0].children[0].children[1].textContent= car.manufacturer;
                carouselSec[0].children[1].children[1].textContent = car.model;
                carouselSec[0].children[2].children[1].textContent= car.price;
            } else {
                carouselImgElement.src = "images/cars/no-image-available.jpg";
                carouselSec[0].children[0].children[1].textContent= '';
                carouselSec[0].children[1].children[1].textContent = '';
                carouselSec[0].children[2].children[1].textContent= '';
            }
        }
    }

    function noop(removedCarId) {
        if(allCars && allCars.length){
            var removedCarIndex = allCars.findIndex( item => item._id === removedCarId);
            (removedCarIndex === -1) ? updateCarousel(allCars[0]._id) : null;
        } else {
            updateCarousel(0);
        }
    }

    function moveCarousel(direction){
        if(currentCarid && allCars.length){
            for(var j=0;j<allCars.length;j++){
                if(allCars[j]._id == currentCarid){
                    if(direction == 1){
                        if(j<allCars.length-1){
                            updateCarousel(allCars[j+1]._id);
                        }else{
                            updateCarousel(allCars[0]._id);
                        }
                    }else{
                        if(j>0){
                            updateCarousel(allCars[j-1]._id);
                        }else{
                            updateCarousel(allCars[allCars.length-1]._id);
                        }
                    }
                    break;
                }
            }
        }
    }

    function populateTable(result){
        var tbody = document.getElementById('table-body');
        for(var i=0; i<result.length; i++){
            var newTr = document.createElement("tr");
            tbody.appendChild(newTr);

            var newTd1 = document.createElement("td");
            newTr.appendChild(newTd1);
            var newImg = document.createElement("img");
            newImg.src = location.protocol+"//"+location.hostname + ":" + location.port + "/images/cars/" + result[i].img;
            newTd1.appendChild(newImg);

            var newTd2 = document.createElement("td");
            newTr.appendChild(newTd2);
            var newSpan1 = document.createElement("span");
            newSpan1.textContent = result[i].manufacturer;
            newTd2.appendChild(newSpan1);

            var newTd3 = document.createElement("td");
            newTr.appendChild(newTd3);
            var newSpan2 = document.createElement("span");
            newSpan2.textContent = result[i].model;
            newTd3.appendChild(newSpan2);

            var newTd4 = document.createElement("td");
            newTr.appendChild(newTd4);
            var newSpan3 = document.createElement("span");
            newSpan3.textContent = result[i].price;
            newTd4.appendChild(newSpan3);

            var newTd5 = document.createElement("td");
            newTr.appendChild(newTd5);
            var newSpan4 = document.createElement("span");
            newSpan4.textContent = result[i].wiki;
            newTd5.appendChild(newSpan4);

            var newTd6 = document.createElement("td");
            newTr.appendChild(newTd6);
            var newAnchor = document.createElement("a");
            newAnchor.textContent = "Remove";
            newAnchor.carid = result[i]._id;
            newAnchor.addEventListener("click",function(evt){
                var p = getPromise('/api/removecar', 'POST', 'carid='+evt.target.carid);
                p.then(function(data){
                    removeCar(evt.target.carid);
                });
                // makeAjaxCall("/api/removecar",function(data){
                //     removeCarFromTable(evt.target.carid);
                // },"POST","carid="+evt.target.carid);
            });
            newAnchor.href="#";
            newTd6.appendChild(newAnchor);
        }
    }

    function removeCar(carid) {
        if(carid){
            for(var k=allCars.length-1; k>=0; k--){
                if(allCars[k]._id == carid){
                    allCars.splice(k,1);
                    carEventsManager.notifySubscribers('remove', carid);
                    break;
                }
            }
        }
    }

    function removeCarFromTable(carid){
        if(carid){
            // for(var k=allCars.length-1; k>=0; k--){
            //     if(allCars[k]._id == carid){
            //         allCars.splice(k,1);
            //         break;
            //     }
            // }
            var tbody = document.getElementById('table-body');
            while (tbody.firstChild) {
                tbody.removeChild(tbody.firstChild);
            }
            populateTable(allCars);
        }
    }

    return {
        init: init
    };

}

function hideAddCar(){
    document.getElementById("section-add-car").style.display = "none";
    document.getElementById("section-main").style.display = "block";
}

initCarousel().init();