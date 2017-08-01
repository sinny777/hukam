# Update image
apt-get update

# Install packages
apt-get install -y wget tar nano motion libjpeg62

mv /usr/src/app/libs/* /usr/lib/arm-linux-gnueabihf
rm -rf /usr/lib/arm-linux-gnueabihf/libbcm_host.so
rm -rf /usr/lib/arm-linux-gnueabihf/libpq.so.5

# Remove old config file
rm -rf /etc/default/motion

# Copy config file
cp /usr/src/app/motion /etc/default/

# Remove old motion config
rm -rf /etc/motion/motion.conf

# Copy motion config file
cp /usr/src/app/motion.conf /etc/motion/

# Do some clean-up
apt-get clean
