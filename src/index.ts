import { createRenderClient } from "./client/render"
import { EventManger } from "./EventManager"
import { open } from "lmdb"

const start = async () => {
	const renderClient = await createRenderClient()

	const database = open("data-broker", {
		compression: true,
	})

	const manager = new EventManger(renderClient, database)

	manager.bootstrap()
}

start()
