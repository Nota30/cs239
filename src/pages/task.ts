import { BoxRenderable, CliRenderer, TextRenderable } from "@opentui/core"
import type { RootDatabase } from "lmdb"
import { getRandomUser } from "../data/random"
import { getRandomTags, Tags } from "../data/tags"

export async function taskScreen(client: CliRenderer, database: RootDatabase) {
	const user = await getRandomUser()
	const target = `${user.name.first} ${user.name.last}, ${user.dob.age}, ${user.location.city}, ${user.location.state}`
	const randomTags = getRandomTags()

	await database.put("target", target)
	await database.put("tags", randomTags)

	const outerBox = new BoxRenderable(client, {
		id: "task",
		width: "100%",
		height: "100%",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
	})

	const header = new BoxRenderable(client, {
		border: true,
		borderColor: "#DE3163",
		width: "100%",
		height: 3,
		flexDirection: "row",
		title: "TASK",
		titleAlignment: "left",
		alignItems: "center",
		justifyContent: "center",
	})

	const rep = await database.get("rep")
	const reputation = new TextRenderable(client, {
		content: `${rep}/100`,
		fg: "#888888",
	})

	const cred = await database.get("credits")
	const credits = new TextRenderable(client, {
		content: `$${cred}`,
		fg: "#888888",
	})

	header.add(
		new TextRenderable(client, {
			content: "Reputation: ",
			fg: "#888888",
		})
	)
	header.add(reputation)
	header.add(
		new TextRenderable(client, {
			content: "   |   Credits: ",
			fg: "#888888",
		})
	)
	header.add(credits)
	outerBox.add(header)

	const innerBox = new BoxRenderable(client, {
		border: true,
		width: "100%",
		borderColor: "#DE3163",
		flexDirection: "column",
		alignItems: "flex-start",
	})

	innerBox.add(
		new TextRenderable(client, {
			content: "New client task. Find all information regarding target.\n\n",
			fg: "#888888",
		})
	)

	innerBox.add(
		new TextRenderable(client, {
			content: `Target: ${target}`,
		})
	)

	innerBox.add(
		new TextRenderable(client, {
			content: `Data requested:`,
		})
	)

	for (let index = 0; index < randomTags.length; index++) {
		innerBox.add(
			new TextRenderable(client, {
				content: `  - ${Tags[randomTags[index]!]}`,
				fg: "#888888",
			})
		)
	}

	innerBox.add(
		new TextRenderable(client, {
			content: "\n\nPress the space key to continue...",
			fg: "#888888",
		})
	)

	outerBox.add(innerBox)

	return outerBox
}
