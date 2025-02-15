import {Client} from "discord.js";
import ComponentListener from "./ComponentListener";
import TagCreateRequestComponentListener from "./components/TagCreateRequestComponentListener";
import TagEditRequestComponentListener from "./components/TagEditRequestComponentListener";

export default class ComponentRegistry {
    client: Client
    listeners: Array<ComponentListener> = []

    constructor(client: Client) {
        this.client = client
        this.register()

        this.client.on("interaction", (interaction) => {
            if (!interaction.isMessageComponent()) return
            this.listeners.filter(value => value.ids.includes(interaction.customID)).forEach(value => value.handleInteraction(interaction))
        })

    }

    register() {
        this.listeners.push(new TagCreateRequestComponentListener())
        this.listeners.push(new TagEditRequestComponentListener())
    }

}