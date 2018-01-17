
var SerialPort = require("serialport");
var unoPort = "/dev/ttyS0";
var serialPort;
var serialportOptions = {baudRate: 9600};

const MPR121 = require('adafruit-mpr121');
var mpr121;

var SX127x = require('sx127x');
var sx127x;

// module.exports = function() {

  var methods = {};

  methods.initAll = function(){
    console.log("IN initAll: >> ");
    methods.initCapacitiveTouch();
    methods.initRadio();
    methods.initSerialport();
  };

  methods.initCapacitiveTouch = function(){
    console.log("IN initCapacitiveTouch: >> ");
    if(!mpr121){
      mpr121  = new MPR121(0x5A, 1);
      mpr121.setThresholds(6, 2);
      mpr121.on('touch', (pin) => console.log(`pin ${pin} touched`));
    }else{
      console.log("<<<<< initCapacitiveTouch ALREADY DONE: >>>>>> ");
    }
  };

  methods.initSerialport = function(){
    console.log("IN initSerialPort: >> ");
      try{
        var Readline = SerialPort.parsers.Readline;
        serialPort = new SerialPort(unoPort, serialportOptions);
        var parser = serialPort.pipe(new Readline({ delimiter: '\n' }));
        parser.on('data', function(data) {
              console.log('\n\ndata received: ' + data);
              serialPort.flush();
          });

          /*
          serialPort.on('data', function (data) {
            console.log('Data:', data);
          });

          // Read data that is available but keep the stream from entering "flowing mode"
          serialPort.on('readable', function () {
            console.log('Readable Data:', serialPort.read());
          });
          */

          serialPort.on('error', function(err) {
            console.log('ERROR In SERIAL PORT COMMUNICATION: >>> ', err);
          });
      }catch(err){
        console.log(err);
      }
  }

  methods.writeToSerialPort = function(command){
		if(serialPort){
			serialPort.write(command, function(){
				console.log('Command Wrote to Serialport Successfully: >>> ', command);
			});
		}else{
			console.log("SerialPort not Initialized yet !");
			methods.initSerialPort();
		}
	};

  methods.initRadio = function(){
      try{
        if(sx127x){
          console.log("<<<<< initRadio ALREADY DONE: >>>>>> ");
          return false;
        }
        console.log("IN initRadio: >> ");
        sx127x = new SX127x({
            frequency: 433e6
          });

        sx127x.open(function(err) {
            console.log('Radio Open: ', err ? err : 'success');
            if (err) {
              console.log(err);
            }
            sx127x.on('data', function(data, rssi) {
      //				    console.log('data:', '\'' + data.toString() + '\'', rssi);
              console.log('\n\nRadio data received: ' + data.toString());
              methods.writeToSerialPort(data.toString());
            });

            // enable receive mode
            sx127x.receive(function(err) {
              console.log('LORA In Receive Mode ', err ? err : 'success');
            });
          });

            process.on('SIGINT', function() {
            // close the device
            sx127x.close(function(err) {
              console.log('close', err ? err : 'success');
              process.exit();
            });
          });

        }catch(err){
          console.log("Error in initRadion: >>>>>>> ");
          console.log(err);
          }
      };

    methods.writeToRadio = function(command){
  		if(sx127x){
  			sx127x.write(new Buffer(command), function(err){
  				if(err){
  					console.log('\tError in writeToRadio: ', err);
  				}else{
  					console.log('Command Broadcast Successfully: >>> ', command);
  				}
  				sx127x.receive(function(err) {
  				    console.log('LORA In Receive Mode ', err ? err : 'success');
  				  });
  			});
  		}else{
  			console.log("Radio not Initialized yet !");
  			methods.initRadio();
  		}
  	};

      methods.initAll();

  // return methods;

// }
