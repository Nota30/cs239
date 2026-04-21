import { BoxRenderable, CliRenderer, TextRenderable } from "@opentui/core"
import type { RootDatabase } from "lmdb"
import { Tags, type TagKey } from "../data/tags"

export async function completeScreen(
	client: CliRenderer,
	database: RootDatabase
) {
	const box = new BoxRenderable(client, {
		id: "complete",
		border: true,
		borderColor: "#DE3163",
		width: "100%",
		height: "100%",
		flexDirection: "column",
		// alignItems: "center",
		// justifyContent: "center",
		title: "TASK COMPLETED",
		titleAlignment: "left",
	})

	const target = await database.get("target")
	const targetd = new TextRenderable(client, {
		content: `\n\nTarget: ${target}`,
	})
	box.add(targetd)

	const tags: TagKey[] = (await database.get("tags")) as TagKey[]
	let tagString = ""
	for (let index = 0; index < tags.length; index++) {
		tagString += Tags[tags[index]!]
		tagString += ", "
	}
	tagString = tagString.slice(0, -2)
	const tagd = new TextRenderable(client, {
		content: `\n\nData to find: ${tagString}`,
	})
	box.add(tagd)

	const found = [
		...new Set((await database.get("found")).slice(0, -2).split(", ")),
	]

	const foundd = new TextRenderable(client, {
		content: `\n\nData found: ${found.join(", ")}`,
	})
	box.add(foundd)

	const targetSet = new Set(found)
	const source = tagString.split(", ")
	const matches = source.filter(item => targetSet.has(item)).length
	const matchRatio = source.length === 0 ? 0 : matches / source.length

	const match = new TextRenderable(client, {
		content: `\n\nYou found ${matches}/${tagString.split(", ").length} pieces of information.`,
	})
	box.add(match)

	let reward = Math.round(matchRatio * 500)
	let penalty = 0 - Math.round((1 - matchRatio) * 25)

	const rewards = new TextRenderable(client, {
		content: `\n\nPayout:\n Credits: $${reward}\n Reputation: ${penalty}`,
	})
	box.add(rewards)

	const cred = (await database.get("credits")) + reward
	const rep = (await database.get("rep")) + penalty

	await database.put("credits", cred)
	await database.put("rep", rep)

	box.add(
		new TextRenderable(client, {
			content: "\n\nPress the space key to continue...",
			fg: "#888888",
		})
	)

	await database.put("target", "")
	await database.put("tags", "")
	await database.put("found", "")

	return box
}
