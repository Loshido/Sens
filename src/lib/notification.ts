import { isBrowser } from "@builder.io/qwik";
import { NotificationPayload } from "~/components/notifications";

export default (payload: NotificationPayload) => {
    if(!isBrowser) {
        console.error(`[lib/notification] must be inside browser`)
        return
    }

    const event = new CustomEvent('notification', {
        detail: payload
    })

    document.dispatchEvent(event)
}