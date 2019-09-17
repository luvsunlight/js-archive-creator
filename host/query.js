const UUID = require("uuid-js")
const { findNodeByName, deleteNodeByName } = require("./util")
const { fileSysTable, fileStatsTable } = require("./config.json")

const getNewKey = ({ type }) => `${type}_${UUID.create().toString()}`

const getStats = ({ connection, name }) => {
	return new Promise(async function(resolve) {
		let data = await connection.query(
			`SELECT * from ${fileStatsTable} WHERE name <=> ${name}`
		)
		resolve(data)
	})
}

const setStats = async function({
	connection,
	name,
	title,
	desc,
	code,
	summary
}) {
	let stat = await getStatsByName({ connection, name })
	if (!stat) {
		let {
			title = "title",
			desc = "desc",
			code = "code",
			summary = "summary"
		} = { name, title, desc, code, summary }
		connection.query(
			`INSERT INTO ${fileStatsTable}(name,title,desc,code,summary) VALUES (${name},${title},${desc},${code},${summary})`
		)
	} else {
		connection.query(
			`UPDATE ${fileStatsTable} SET title=${title}, desc=${desc}, code=${code}, summary=${summary} WHERE name <=> ${name}`
		)
	}
}

const getFile = ({ connection, name, type }) => {
	return new Promise(async function(resolve) {
		let fileSys = await connection.query(`SELECT * FROM ${fileSysTable}`)
		let file = findNodeByName(fileSys, name, type)
		resolve(file)
	})
}

const addFile = async function({
	connection,
	parentNodeName,
	childNodeName,
	type
}) {
	let fileSys = await connection.query(`SELECT * FROM ${fileSysTable}`)
	let file = findNodeByName(fileSys, parentNodeName, "folder")
	if (!file) return null
	file.children = file.children || []
	file.children.push({
		name: childNodeName,
		type,
		children: []
	})
	connection.query(
		`UPDATE ${fileSysTable} SET struct='${JSON.stringify(fileSys)}'`
	)

	let b = 0
	let a = 0
}

const renameFile = async function({ connection, oldName, newName, type }) {
	let fileSys = await connection.query(`SELECT * FROM ${fileSysTable}`)
	let file = findNodeByName(fileSys, oldName, type)
	if (!file) return null
	file.name = newName
	/* Update fileSys*/
	connection.query(
		`UPDATE ${fileSysTable} SET struct='${JSON.stringify(fileSys)}'`
	)
	/* Update fileStats */
	if (type === "file") {
		connection.query(
			`UPDATE ${fileStatsTable} SET name=${newName} WHERE name <=> ${oldName}`
		)
	}
}

const deleteFile = async function({ connection, name, type }) {
	/* Delete FileSys */
	let fileSys = await connection.query(`SELECT * FROM ${fileSysTable}`)
	let file = findNodeByName(fileSys, parentNodeName, "folder")
	if (!file) return null
	deleteNodeByName(name, type)
	connection.query(
		`UPDATE ${fileSysTable} SET struct='${JSON.stringify(fileSys)}'`
	)
	/* Delete FileStat */
	connection.query(`DELETE FROM ${fileStatsTable} WHERE name <=> ${name}`)
}

module.exports = {
	getNewKey,
	getStats,
	setStats,
	getFile,
	addFile,
	renameFile,
	deleteFile
}
