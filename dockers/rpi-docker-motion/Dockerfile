FROM resin/rpi-raspbian:jessie
MAINTAINER Gurvinder Singh <contact@hukamtechnologies.com>

ENV BUILD_VERSION="V1"

USER root

# Updates S.O. and adds system required packages
RUN apt-get update && apt-get install -y wget tar && apt-get clean

# Create a directory where our app will be placed
RUN mkdir -p /usr/src/app

#Change directory so that our commands run inside this new directory
WORKDIR /usr/src/app

COPY entrypoint.sh /usr/src/app
COPY install-motion-latest.sh /usr/src/app
COPY motion.conf /usr/src/app
COPY motion /usr/src/app

RUN mkdir /tmp/motion
RUN mkdir /tmp/motion/cam1
RUN touch /tmp/motion/motion.log
RUN sudo chmod 755 -R /tmp/motion

RUN chmod 755 /usr/src/app/entrypoint.sh
RUN chmod 755 /usr/src/app/install-motion-latest.sh

RUN /usr/src/app/install-motion-latest.sh

CMD /usr/src/app/entrypoint.sh

EXPOSE 80
