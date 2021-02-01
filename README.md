# Fog Computing 2021: Prototyping Assignment
Our Weather Statistics Fog Application is a simplified tool that collects temperature data from two sensors and displays aggregated statistics of the temperature on a Web Interface. In practice it could be part of a large Fog that collects data from many different locations to generate weather forecasts.

### Setup
Figure 1 displays the Setup of our Weather Statistics Application. The two sensors and the Web Interface are running on local machines, and the instance that stores the simulated data and provides it to the Web Interface is running on a Linux (Ubuntu 18) instance provided by AWS. 

### Two Sensors
The two sensors are simulating temperature values  from two different locations. They are written in php and js and can be found in the sensors directory of the repository. For visualization we added a frontend, in a real-world scenario one could ommit that to make the edge nodes leaner.

### Transmission of data between cloud and local instances
Both local sensors emit data every 5 seconds and send it to the virtual node which stores the data and sends back a success message on receive. 
The node server will start fetching data from the cloud as soon as the user opens the web page. Whenever startet, the node server will continue sending requets to the cloud node every 10s and wait for an answer. The cloud instance will send answers containint data objects as JSON (see [fognode](fognode/index.php)).

### How the nodes keep working when disconnected
The sensors store the data in their cache and continuously check if the network is online and whether the fog node can be reached. If one test fails, data will be stores in the local cache (see [saveDatLocally](sensors/js/sensor1.js)). 
<br>
Once both are up, the data will be transferred to the cloud node. Thus data will be stored in the cache, until it can be transmitted successfully (see sendData of sensors). Once the data is sent, the sensors await a response from the server, either a succes is received and displayed, or an alert will be displayed on the frontend. 
<br><br>
The fetchDataFromFog method (see [Node Server](fcwebnode/routes/index.js)) of the node.js server runs every 10 seconds and tries to fetch data from the cloud node. On success the data is sent to the browser, on failure, the browser receives a notification that the cloud node is offline. The communication with the browser is happening via Websockets. <br>
Depending on the type of message, the browser will either process and display the fetched data, or it will load the ‘Offline’ page until new data is fetched again (see [Frontend](fcwebnode/public/javascripts/main.js)). To ensure that no data is missing, the node server will fetch all of the most recent values. During data processing the browser will sort and prepare the values for representation. <br>
As soon as the server receives a reply from the cloud node, the page will switch to ‘Online’ mode and start displaying the new data again. 

#### How to start the Node Server
To start the node Server go to fcwebnode directory and run 

```
npm install
npm start
```
Navigate to: `http://localhost:3000/` 
The App will automatically start fetching data of the sensors from the Cloud Instance
