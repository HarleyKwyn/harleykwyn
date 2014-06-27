############################################################
# Dockerfile for Personal Website                          #
# Based on Centos                                          #
############################################################

FROM	centos:6.4
# Enable EPEL for Node.js
RUN   rpm -Uvh http://download.fedoraproject.org/pub/epel/6/i386/epel-release-6-8.noarch.rpm
# Install Node.js and npm
RUN   yum install -y npm

# Install Bower
RUN		npm install -g bower
# Bundle app source
ADD 	. /src
# Install server dependencies
RUN 	cd /src; npm install
# Install front-end dependencies
RUN 	cd /src/public; bower install --allow-root 

EXPOSE  8080

CMD ["npm start"]