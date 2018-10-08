import { TabRef } from "./tabRef";
import { RemoteSession } from "../../remotesession";
import { Store } from "../../../../routerlicious/packages/store";
import { captureVisibleTab } from "./utils";

const userId = `user-${Math.random().toString(36).substr(2, 4)}`;
const store = new Store("http://localhost:3000");
let sourceTab = new TabRef();
let remoteId = "";

export const isSharing = (tabId: number) => {
    return sourceTab.id === tabId;
};

export const start = async (sourceTabId: number, remoteSessionId: string) => {
    if (isSharing(sourceTabId)) {
        return remoteId;
    }

    sourceTab = new TabRef(sourceTabId);
    const remoteSession = await store.open<RemoteSession>(remoteSessionId, userId, `@chaincode/collab-browser@latest`);
    console.log(`Opened ${remoteSessionId}`);
    let previousImage = "";
    let lastStart = NaN;
    
    const pollForChanges = async () => {
        if (sourceTab.isClosed) {
            return;
        }

        const tab = await sourceTab.tab;
        let nextImage: string;
        // Note: 'captureVisibleTab' will throw if the tab is not currently visible.
        try {
            nextImage = await captureVisibleTab(tab.windowId, { format: "jpeg", quality: 80 });
        } catch (error) {
            // If unable to capture the tab, do nothing and try again later.
            pollAgainLater();
            return;
        }

        if (nextImage === previousImage) {
            const elapsed = Date.now() - lastStart;
            if (elapsed > 32) {
                console.log(`*** Capture Screenshot(high)`);
                const tab = await sourceTab.tab;

                // Note: 'captureVisibleTab' will throw if the tab is not currently visible.
                try {
                    const image = await captureVisibleTab(tab.windowId, { format: "jpeg", quality: 90 });

                    // If unable to capture the tab, do nothing and try again later.
                    await remoteSession.setImage(image, tab.width, tab.height);
                    lastStart = NaN;
                } catch (error) { /* do nothing */ }
            }
            pollAgainLater();
            return;
        }

        console.log(`*** Capture Screenshot(low)`);
        await remoteSession.setImage(nextImage, tab.width, tab.height);
        previousImage = nextImage;

        window.setTimeout(pollForChanges, 8);
        lastStart = Date.now();
    }

    const pollAgainLater = () => {
        window["requestIdleCallback"](pollForChanges, { timeout: 8 });
    }

    pollForChanges();

    return remoteSessionId;
};

export const stop = () => { sourceTab = new TabRef(); };