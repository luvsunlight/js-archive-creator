import UUID from "uuid-js"
import { findNodeByName } from "../util"

export default {
	getNewName: state => (type = "file") => {
		return `new_${type}`
	},
	getNewKey: state => (type = "file") => {
		return `${type}-${UUID.create().toString()}`
	},
	getFileStatsByName: state => name => {
		return state.fileStats.find(file => file.name === name)
	},
	findNode: state => (name, type) => {
		return findNodeByName(state.fileSys, name, type)
	}
}
