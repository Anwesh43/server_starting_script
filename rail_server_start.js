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
				process.chdir(path)
				const commandParts = command.split(' ')
				if(commandParts.length > 0) {
						const mainCommand = commandParts[0]
						commandParts.splice(0,1)
						const serverCommand = childProcess.spawn(mainCommand,commandParts)
						serverCommand.stdout.on('data',(data)=>{
								console.log(`${serverName}-${data.toString()}`)
						})
						serverCommand.stdout.on('close',()=>{
								console.log(`${serverName} has stopped`)
						})
				}
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
