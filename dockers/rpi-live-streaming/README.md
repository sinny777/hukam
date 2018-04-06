# LIVE STREAMING WITH RASPBERRYPI

## Basic Setup on Raspberry Pi

`curl -sSL https://get.docker.com | sh`
`sudo usermod pi -aG docker`
Then we connect the official Raspberry Pi camera and activate it.

`sudo raspi-config`
Under “Interfacing Options” -> “Camera” you will find the menu item for activating the camera. Thereafter, it will restart.

Now we test the recording function of the camera. Enter the following in the console:

`sudo raspistill -o test.jpg`
This should take a picture. If you get an error here, enter the following command and then restart the system (sudo reboot):

`sudo modprobe bcm2835-v4l2`


## Commands to run Live streaming as Docker image
`docker pull hukam/rpi-live-streaming`

`docker run --privileged --name live -ti hukam/rpi-live-streaming xxxx-xxxx-xxxx-xxxx`

Have the key displayed and copy it. We will now have to enter it in the Raspberry Pi (instead of xxxx-xxxx-xxxx-xxxx)

If you have stopped the stream with Ctrl+C and would like to restart it later, you will get an error if you start in the same way (“docker: Error response from daemon: Conflict. The container name “/cam” is alrea dy in use by container …”). So just start with:

`docker start live`

Quitting is just as easy:

`docker stop live`


---------------------------------

By default, ffmpeg is not listed in the Raspberry Pi repository when running ‘sudo apt-get install ffmpeg’. You will have to manually add a new repository to the source list in /etc/apt/sources.list:

`sudo nano /etc/apt/sources.list`

Add the following line to the list:

`deb http://www.deb-multimedia.org jessie main non-free`

Update the list of available packages:

`sudo apt-get update`

Install ffmpeg:

`sudo apt-get install ffmpeg`
