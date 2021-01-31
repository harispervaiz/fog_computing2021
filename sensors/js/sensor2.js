var temperature = '';
var name = 'sensor2';
function checkInternet(){

    if(navigator.onLine){
        // alert('online');
        $("#i_status").css("color","green");
        $("#i_status").html("Online");

        sendData(temperature,getDateTime(),1,name);//temperature,datetime,status,name

        if(localStorage.getItem("data")){
            sendCachedData();
            localStorage.clear();
        }
    }else{
        $("#i_status").css("color","red");
        $("#i_status").html("Offline");
        saveDataLocally();
        sendCachedData();
    }

}


function sendCachedData(){

    let data = JSON.parse(localStorage.getItem("data"));

    for(i=0; i<data.length; i++){
        sendData(data[i].temperature,data[i].datetime,data[i].status,data[i].name)
    }
    $(".status").html(data[data.length - 1].temperature );


}

function sendData(temperature, datetime, status, name){

    $.ajax({
        type: "POST",
        url: 'http://3.125.69.91/fog_computing2021/sensors/update.php',
        data: {temperature: temperature, datetime: datetime, status: status, name: name},
        success: function(data) {
            $('#server_response').html(data);
        },
        error: function(

        ) {
            $('#server_response').html('Fail');
        }
    }).fail(function () {
        $('#server_response').html('Fail');

    });
}

function randomInteger(min, max) {
    temperature = Math.floor(Math.random() * (max - min + 1)) + min;
    return temperature;
}

function getDateTime(){
    let datetime = new Date();

    let month = datetime.getMonth()+1;
    let day = datetime.getDate();
    let hour = datetime.getHours();
    let minute = datetime.getMinutes();
    let second = datetime.getSeconds();

    let output = datetime.getFullYear() + '-' +
        ((''+month).length<2 ? '0' : '') + month + '-' +
        ((''+day).length<2 ? '0' : '') + day + ' ' +
        ((''+hour).length<2 ? '0' :'') + hour + ':' +
        ((''+minute).length<2 ? '0' :'') + minute + ':' +
        ((''+second).length<2 ? '0' :'') + second;

    return output;
}

function saveDataLocally(){
    datetime = getDateTime();

    let existing_data = JSON.parse(localStorage.getItem("data"));
    if(existing_data == null) {existing_data = []};

    let data = {
        "temperature": temperature,
        "datetime": datetime,
        "status" : 0,
        "name" : name
    };
    existing_data.push(data);
    localStorage.setItem("data", JSON.stringify(existing_data));

}

$(document).ready(function() {

    let update = document.getElementById("update");
    setInterval(() => update.innerHTML = Math.floor(randomInteger(5,10)), 5000);
    setInterval(checkInternet, 5000);

    // 5 * 1000 ms = 5 seconds   ----------------------------------------^^^^


});