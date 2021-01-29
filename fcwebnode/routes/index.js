var express = require('express');
var router = express.Router();
var axios = require('axios');

/* GET home page.*/
router.get('/',  function(req, res) {
   res.render('index', { title: 'Weather Stats'});
   fetchDataFromFog()
   runFetchData();
});

////////////////////////////////////////////
//
// Websockets communication with Browser
//
////////////////////////////////////////////
const WebSocket = require('ws')

const wss = new WebSocket.Server({ port: 8090 })
let browser = "";

wss.on('connection', ws => {
  ws.on('message', message => {
    console.log(`Received message => ${message}`)
  })
  browser = ws;
})

function sendDataToBrowser(data){
  try {
    browser.send(data)
  } catch {
    console.log("Data cannot be displayed while browser not opened")
  }
}



////////////////////////////////////////////
//
// Fetch new data from Message Broker
//
////////////////////////////////////////////
async function fetchDataFromFog(){
  await sleep(1000)
  console.log("Fetching Data from Cloud Server")
  var config = {
    method: 'get',
    url: 'http://3.125.69.91/fog_computing2021/fognode/',
    headers: { }
  };
  axios(config)
      .then(function (response) {
        console.log("Recieved data from Cloud Server");
        sendDataToBrowser(JSON.stringify(response.data))

      })
      .catch(function (error) {
        console.log("Could not fetch data from Cloud Server, Server is offline");
        sendDataToBrowser("Cloud Server offline");
      });
}

async function runFetchData(){
    await sleep(9000)
    await fetchDataFromFog();
    runFetchData();
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = router;
