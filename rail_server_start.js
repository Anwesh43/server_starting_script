#!/usr/local/bin/node
const n = 1
const config = require('./config')
const childProcess = require('child_process')

console.log(config)
console.log(process.argv.length)
const runServer = (serverName)=>{
	const serverObj = config[serverName]
        const path = serverObj["path"]
        const command = serverObj["command"]
        console.log(path)
        console.log(command)
        childProcess.exec(`cd ${path};${command}`,{maxBuffer:n*1024*1024},(err,stdout)=>{
                if(err) {
                        console.log(err)
                }
                else {
                        console.log("successfully changed folder")
                        console.log(stdout)
                        console.log(stderr)

                }
        })

}
if(process.argv.length == 3){
	const serverName = process.argv[2]
	runServer(serverName)
}
else {
	console.log(Object.keys(config))
	for(let serverName of Object.keys(config)){
		console.log(serverName)
		runServer(serverName)
	}
}
