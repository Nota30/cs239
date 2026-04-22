import { createDatabaseClient } from "./client/database"
import { createRenderClient } from "./client/render"
import { EventManger } from "./EventManager"

const start = async () => {
	const renderClient = await createRenderClient()

	const database = await createDatabaseClient()

	const manager = new EventManger(renderClient, database)

	manager.bootstrap()
}

start().catch(err => {
	console.error(err)
	process.exit(1)
})
