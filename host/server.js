const http = require("http")
const mysql = require("mysql")
const url = require("url")
const {
	host,
	port,
	user,
	password,
	database,
	fileSysTable,
	fileStatsTable
} = require("./config.json")

const connection = mysql.createConnection({
	host,
	user,
	password,
	port,
	password,
	port,
	database
})

connection.connect()

console.log("Running server...")

http.createServer(function(req, res) {
	res.writeHead(200, {
		"Content-Type": "text/plain",
		"access-control-allow-origin": "*"
	})
	const parseReq = url.parse(req.url, true)
	const path = parseReq.pathname
	const apiType = path.split("/")[2]
	const apiName = path.split("/")[3]
	console.log(`handle request [${parseReq.path}]`)

	switch (apiType) {
		case "util":
			switch (apiName) {
				case "newKey":
					break
			}
			break
		case "stats":
			switch (apiName) {
				case "get":
					break
				case "set":
					break
			}
			break
		case "/data":
			switch (apiName) {
				case "add":
					break
				case "rename":
					break
				case "delete":
					break
				case "get":
					break
			}
	}
}).listen(8888)
