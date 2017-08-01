# Update image
apt-get update

# Install packages
apt-get -y install libavcodec-dev libavcodec0d libavformat-dev libavformat0d
apt-get install -y wget tar nano motion libjpeg62

rm -rf /etc/default/motion
cp /usr/src/app/motion /etc/default/

# Remove old motion config
rm -rf /etc/motion/motion.conf

# Copy motion config file
cp /usr/src/app/motion.conf /etc/motion/

# Do some clean-up
apt-get clean
