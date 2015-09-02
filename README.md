DoDoc - Rapsberry Pi
==========

##Presentation

DoDoc is a documentation tool for children in classrooms. This version is specific for the Raspberry pi.

##Installing Dodoc on Rapsbian

### Clone the repo
```git clone https://github.com/sarahgarcin/dodoc-fes.git```

### Generate Security files
- csr.pem
- file.crt
- file.pem
Copy them in the Dodoc root directory

### Installing Node.js
Follow this tutorial http://www.andrewconnell.com/blog/setup-node-js-on-raspberry-pi-2-b
Do only "Update the Raspberry Pi” and "Install Node.js” 

### Installing ffmpeg
Follow this tutorial http://www.jeffreythompson.org/blog/2014/11/13/installing-ffmpeg-for-raspberry-pi/
Be patient, it's quite long (like 3 hours)

### Installing dependencies
```sudo npm install```

###Run DoDoc
Run the server in the terminal
```node server.js```

Go to browser (we recommend IceWeasler) and go to the url
https://localhost:8080

