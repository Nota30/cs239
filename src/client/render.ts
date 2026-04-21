import { CliRenderer, createCliRenderer, type CliRendererConfig } from "@opentui/core";

export async function createRenderClient(): Promise<CliRenderer> {
    const renderOptions: CliRendererConfig = {
        exitOnCtrlC: true
    }

    return await createCliRenderer(renderOptions)
}