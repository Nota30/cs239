import {
	ASCIIFontRenderable,
	BoxRenderable,
	CliRenderer,
	TextRenderable,
} from "@opentui/core"
import type { RootDatabase } from "lmdb"

export async function terminateScreen(
	client: CliRenderer,
	database: RootDatabase
) {
	const box = new BoxRenderable(client, {
		id: "terminate",
		border: true,
		borderColor: "#DE3163",
		width: "100%",
		height: "100%",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
	})

	const title = new ASCIIFontRenderable(client, {
		text: "TERMINATED",
		paddingBottom: 20,
		font: "huge",
		color: "#DE3163",
	})

	box.add(title)

	const rep = await database.get("rep")
	const cred = await database.get("credits")
	const description = new TextRenderable(client, {
		content: `Reputation: ${rep}/100   |   Credits: $${cred}`,
		fg: "#888888",
	})

	box.add(description)

	return box
}
