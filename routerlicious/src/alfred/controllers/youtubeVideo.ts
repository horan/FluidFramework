import * as resources from "gitresources";
import { api, socketStorage } from "../../client-api";
import { controls, ui } from "../../client-ui";

async function loadDocument(id: string, version: resources.ICommit, token: string, client: any): Promise<api.Document> {
    console.log("Loading in root document...");
    const document = await api.load(id, { client, encrypted: false, token }, version);

    console.log("Document loaded");
    return document;
}

export async function initialize(id: string, version: resources.ICommit, token: string, config: any) {
    const host = new ui.BrowserContainerHost();

    socketStorage.registerAsDefault(
        document.location.origin,
        config.blobStorageUrl,
        config.tenantId,
        config.trackError);

    const doc = await loadDocument(id, version, token, config.client);
    const root = doc.getRoot();

    const element = document.getElementById("player-div") as HTMLDivElement;

    const canvas = new controls.YouTubeVideoCanvas(element, doc, root);
    host.attach(canvas);
}
