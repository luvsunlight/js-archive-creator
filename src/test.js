const findNodeByName = (node, name) => {
	if (node.name == name) {
		return node
	} else if (node.children && node.children.length) {
		for (let i = 0; i < node.children.length; i++) {
			let child = node.children[i]
			let result = findNodeByName(child, name)
			if (result) {
				return result
			}
		}
	} else {
		return null
	}
}

let a = { name: "a", children: [{ name: "b" }, { name: "c" }] }

findNodeByName(a, "b")
