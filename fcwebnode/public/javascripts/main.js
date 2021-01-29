///////////////////////////////////////
//
// Websocket Communication with Server
//
///////////////////////////////////////
const url = 'ws://localhost:8090'
const connection = new WebSocket(url)

connection.onopen = () => {
    connection.send('Client Ready')
}

connection.onerror = (error) => {
    console.log(`WebSocket error: ${error}`)
}

connection.onmessage = (e) => {
    if(e.data === "Server offline") {
        console.log("The Server is offline, new data cannot be displayed")
        showOfflinePage()
    } else {
        console.log("Received new data from the Cloud Server")
        processData(e.data)
        showOnlinePage()
    }
}


///////////////////////////////////////
//
// Chart
//
///////////////////////////////////////
var ctx = document.getElementById('chart').getContext('2d');
var ctx2 = document.getElementById('bar').getContext('2d');
var ctx3 = document.getElementById('chart2').getContext('2d');
function drawChart(){
    let labels_sensor_one = sensor_One.slice(-20).map(item => item.time.toString().split(" ").slice(-1))
    let labels_sensor_two = sensor_Two.slice(-20).map(item => item.time.toString().split(" ").slice(-1))
    let sensor_One_Values = sensor_One.slice(-20).map(item => item.temp)
    let sensor_Two_Values = sensor_Two.slice(-20).map(item => item.temp)

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels_sensor_one,
            datasets: [{
                label: 'Sensor 1',
                data: sensor_One_Values,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        min: 0
                    }
                }]
            }
        }
    });

    new Chart(ctx3, {
        type: 'line',
        data: {
            labels: labels_sensor_two,
            datasets: [ {
                label: 'Sensor 2',
                data: sensor_Two_Values,
                backgroundColor: [
                    'rgba(61,112,241,0.2)'
                ],
                borderColor: [
                    'rgb(61,112,241)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        min: 0
                    }
                }]
            }
        }
    });
}

function drawBar(){
    new Chart(ctx2, {
        type: 'doughnut',
        data: {
            labels: ["Offline","Online"],
            datasets: [{
                data: serverStatus,
                backgroundColor: [
                    'rgb(226,255,99)',
                    'rgb(255,99,99)'
                ]
            }]
        }
    })
}

///////////////////////////////////////
//
// Process Data from Server
//
///////////////////////////////////////
let serverStatus = [0,0]
let sensor_One = [];
let sensor_Two = [];

function processData(data){
    let d = JSON.parse(data)
    for (let i=0; i<d.length; i++){
        let sensor = d[i].name;
        let time = d[i].datetime;
        let value = d[i].temperature;
        let status = Number.parseInt(d[i].status);

        //Add value to correct sensor
        if(sensor === "sensor1"){
            sensor_One.push({time: time, temp: value})
        }
        if(sensor === "sensor2"){
            sensor_Two.push({time: time, temp: value})
        }
        if(status === 0){serverStatus[0] = serverStatus[0]+1}
        else {serverStatus[1] = serverStatus[1]+1}
    }
    sensor_One.sort((a,b)=>{
        let keyA = new Date(a.time), keyB = new Date(b.time);
        if(keyA < keyB) return -1;
        if(keyA > keyB) return 1;
        return 0;
    })

    sensor_Two.sort((a,b)=>{
        let keyA = new Date(a.time), keyB = new Date(b.time);
        if(keyA < keyB) return -1;
        if(keyA > keyB) return 1;
        return 0;
    })

    drawChart()
    drawBar()
}



// OFFLINE and ONLINE Pages
function showOfflinePage(){
    document.getElementById("offlineBox").style.display = "block";
    document.getElementById("onlineBox").style.display = "none";
}

function showOnlinePage(){
    document.getElementById("offlineBox").style.display = "none";
    document.getElementById("onlineBox").style.display = "block";
}
