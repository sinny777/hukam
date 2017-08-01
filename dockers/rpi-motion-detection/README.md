#Motion in a Container on Raspbian Jessie
![Docker & Raspberry Pi](/images/docker+rpi.png)

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
