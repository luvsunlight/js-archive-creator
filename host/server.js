const http = require("http")
const mysql = require("mysql")
const url = require("url")
const { host, port, user, password, database } = require("./config.json")
const {
	getNewKey,
	getStats,
	setStats,
	getFile,
	addFile,
	renameFile,
	deleteFile
} = require("./query")

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

http.createServer(async function(req, res) {
	res.writeHead(200, {
		"Content-Type": "text/plain",
		"access-control-allow-origin": "*"
	})
	const parseReq = url.parse(req.url, true)
	const path = parseReq.pathname
	const apiType = path.split("/")[2]
	const apiName = path.split("/")[3]
	const args = parseReq.query
	console.log(`handle request [${parseReq.path}]`)

	switch (apiType) {
		case "util":
			switch (apiName) {
				case "newKey":
					res.end(getNewKey(args))
			}
			break
		case "stats":
			switch (apiName) {
				case "get":
					let data = await getStats(
						Object.assign({ connection }, args)
					)
					res.end(JSON.stringify(data))
					break
				case "set":
					setStats(Object.assign({ connection }, args))
					break
			}
			break
		case "/data":
			switch (apiName) {
				case "get":
					let data = await getFile(
						Object.assign({ connection }, args)
					)
					res.end(JSON.stringify(data))
					break
				case "add":
					addFile(Object.assign({ connection }, args))
					break
				case "rename":
					renameFile(Object.assign({ connection }, args))
					break
				case "delete":
					deleteFile(Object.assign({ connection }, args))
					break
			}
	}
}).listen(8888)
