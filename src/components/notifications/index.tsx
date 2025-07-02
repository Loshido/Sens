import { component$, useStore, useVisibleTask$ } from "@builder.io/qwik";

export interface NotificationPayload {
    message: string
    style?: 'error' | 'info' | 'success'
}

export const Notification = (payload: NotificationPayload) => <div
    class={[
        "px-3 py-2  border rounded relative",
        !payload.style && "border-black/10 bg-black/0",
        payload.style == 'error' && "border-red-600/60 bg-red-200/50",
        payload.style == 'info' && "border-blue-600/60 bg-blue-200/50",
        payload.style == 'success' && "border-green-600/60 bg-green-200/50",
    ]}>
    { payload.message }
    <div class={[
        "absolute bottom-0 left-0 rounded h-1", 
        !payload.style && "bg-black/15",
        payload.style == 'error' && "bg-red-600/60",
        payload.style == 'info' && "bg-blue-600/60",
        payload.style == 'success' && "bg-green-600/60",
    ]}
        style={{
            animation: "fill 3s linear"
        }}/>
</div>

export default component$(() => {
    const notifications = useStore<(NotificationPayload & {id: number})[]>([])

    useVisibleTask$(() => {
        document.addEventListener('notification', event => {
            const e = event as CustomEvent
            const id = Math.floor(Math.random() * 999999)
            notifications.push({
                id,
                message: e.detail.message,
                style: e.detail.style
            })

            setTimeout(() => {
                const i = notifications.findIndex(n => n.id === id)
                if(i >= 0) notifications.splice(i, 1)
            }, 3000)
        })
    })

    return <div class="absolute bottom-0 left-0 w-full h-fit p-4
        flex flex-col-reverse gap-1">
        {
            notifications.map(notification => 
                <Notification
                    key={notification.id}
                    message={notification.message}
                    style={notification.style}/>)
        }
        
    </div>
})