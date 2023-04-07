const { spawn } = require("child_process");
const { readFileSync } = require("fs-extra");
const http = require("http");
const axios = require("axios");
const chalk = require("chalk");
const semver = require("semver");
const logger = require("./utils/log");

/////////////////////////////////////////////
//========= Check node.js version =========//
/////////////////////////////////////////////

// const nodeVersion = semver.parse(process.version);
// if (nodeVersion.major < 13) {
//     logger(`Your Node.js ${process.version} is not supported, it required Node.js 13 to run bot!`, "error");
//     return process.exit(0);
// };

///////////////////////////////////////////////////////////
//========= Create website for dashboard/uptime =========//
/////////////////////////////////////////////////////

const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 8080;

// sendFile will go here
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.listen(port);
console.log('\n\nBạn Đang Chạy Bot Trên Host:  ' + port);


/////////////////////////////////////////////////////////
//========= Create start bot and make it loop =========//
/////////////////////////////////////////////////////////

function startBot(message) {
    (message) ? logger(message, "[ Starting ]") : "";

    const child = spawn("node", ["--trace-warnings", "--async-stack-traces", "mirai.js"], {
        cwd: __dirname,
        stdio: "inherit",
        shell: true
    });

    child.on("close",async (codeExit) => {
      var x = 'codeExit'.replace('codeExit',codeExit);
        if (codeExit == 1) return startBot("Restarting...");
         else if (x.indexOf(2) == 0) {
           await new Promise(resolve => setTimeout(resolve, parseInt(x.replace(2,'')) * 1000));
                 startBot("Open ...");
       }
         else return; 
    });

    child.on("error", function (error) {
        logger("An error occurred: " + JSON.stringify(error), "[ Starting ]");
    });
};

////////////////////////////////////////////////
//========= Check update from Github =========//
////////////////////////////////////////////////


axios.get("https://raw.githubusercontent.com/Kenne400k/phatconcac/main/package.json").then((res) => { 
    logger(res['data']['description'], "◈ Note:");
  });
  
  const chalkAnimation = require('chalkercli');
chalkAnimation.rainbow('\n[ VN ] • Bạn Đang Sử Dụng File Bot Của Nguyễn Phát\n[ PB ] • Premium\n\n');
startBot();
