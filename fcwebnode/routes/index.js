var express = require('express');
var router = express.Router();
var axios = require('axios');

/* GET home page.*/
router.get('/', async function(req, res, next) {
  await res.render('index', { title: 'Weather Stats'});
  await fetchDataFromFog();
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
  ws.send('Hello From Server!')
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
        console.log("Could not fetch data from Server, Server is offline");
        sendDataToBrowser("Server offline");
      });
}

async function runFetchData(){
    await sleep(10000)
      await fetchDataFromFog();
      await runFetchData();
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = router;
