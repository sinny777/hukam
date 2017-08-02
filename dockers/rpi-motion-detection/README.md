#Motion in a Container on Raspbian Jessie
![Docker & Raspberry Pi](/images/docker+rpi.png)

## Pre-Install
### Make sure that the Pi Camera is accessable true /dev/video0 after a reboot
sudo sed -i -e /'exit 0'/d /etc/rc.local
echo 'sudo modprobe bcm2835-v4l2' | sudo tee --append /etc/rc.local
echo 'exit 0' | sudo tee --append /etc/rc.local

## Running Docker container for motion detection

START CONTAINER

`docker run --rm -it -d --name motion -p 80:8081 -v /tmp:/tmp --device=/dev/video0 hukam/rpi-motion-detection`

TO START MOTION DETECTION

`docker exec -it motion motion`

TO STOP

`docker exec -it motion service motion stop`

## REFERENCES
[Motion Detection 1](https://github.com/remonlam/rpi-docker-motion)
 |
[Motion Detection 2](https://github.com/yushi/rpi-dockerfile)
