# LIVE STREAMING WITH RASPBERRYPI
pghp-sgv2-1eza-29xs

By default, ffmpeg is not listed in the Raspberry Pi repository when running ‘sudo apt-get install ffmpeg’. You will have to manually add a new repository to the source list in /etc/apt/sources.list:

`sudo nano /etc/apt/sources.list`

Add the following line to the list:

`deb http://www.deb-multimedia.org jessie main non-free`

Update the list of available packages:

`sudo apt-get update`

Install ffmpeg:

`sudo apt-get install ffmpeg`
