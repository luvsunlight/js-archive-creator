import axios from "axios"

const instance = axios.create({
	baseURL: "api",
	headers: {
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Headers":
			"Authorization,Origin, X-Requested-With, Content-Type, Accept",
		"content-type": "application/x-www-form-urlencoded"
	}
})

const api_getNewKey = ({ type = "file" }) =>
	instance.get("/util/newKey", { params: { type } })

const api_getStats = ({ name }) =>
	instance.get("/stats/get", {
		params: { name }
	})

const api_setStats = ({ name, title, desc, code, summary }) =>
	instance.post("/stats/set", {
		params: {
			name,
			title,
			desc,
			code,
			summary
		}
	})

const api_getFile = ({ name, type }) =>
	instance.get("/data/get", { params: { name, type } })

const api_addFile = ({ parentNodeName, childNodeName, type }) =>
	instance.post("/data/add", {
		params: { parentNodeName, childNodeName, type }
	})

const api_renameFile = ({ oldName, newName, type }) =>
	instance.post("/data/rename", {
		params: {
			oldName,
			newName,
			type
		}
	})

const api_deleteFile = ({ name, type }) =>
	axios.post("/api/data/delete", { params: { name, type } })

export {
	api_getNewKey,
	api_getStats,
	api_setStats,
	api_getFile,
	api_addFile,
	api_renameFile,
	api_deleteFile
}
