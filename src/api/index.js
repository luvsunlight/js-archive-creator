import axios from "axios"

export const add = ({ name }) =>
	axios.get("/file/add", {
		params: {
			name
		}
	})

export const rename = ({ oldName, name }) =>
	axios.post("/file/rename", { params: { oldName, name } })
