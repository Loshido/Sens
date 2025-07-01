import { component$, Slot, type PropsOf, type Signal } from "@builder.io/qwik";

type NavProps = Omit<PropsOf<'dialog'>, 'style' | 'open'> & {
    open: Signal<boolean>
}

export default component$(({ open, class: className, ...props }: NavProps) => {
    return <nav class="w-full h-fit p-2 isolate z-30 border-b border-black/5 transition-all duration-150">
        <div class={[
            "hover:bg-black/5 w-10 h-10 p-2 rounded cursor-pointer relative group",
            open.value && "open"]}
            onClick$={() => open.value = !open.value}>
            <span class="absolute h-1 w-6 bg-black left-2 
                transition-transform top-2.5 rounded
                group-[.open]:rotate-45 group-[.open]:top-4.5"/>
            <span class="absolute h-1 w-6 bg-black left-2 
                transition-all top-4.5 rounded
                group-[.open]:opacity-0 group-[.open]:w-0"/>
            <span class="absolute h-1 w-6 bg-black left-2 
                transition-transform top-6.5 rounded
                group-[.open]:-rotate-45 group-[.open]:top-4.5"/>
        </div>
        {
            open.value && <dialog open 
                onClick$={() => {
                    open.value = false
                }}
                {...props}
                class={[
                    "w-dvw absolute top-14 left-0",
                    "bg-white/25 backdrop-blur-sm",
                    className
                ]}
                style={{
                    height: "calc(100dvh - 56px)",
                    animation: "fade-in .1s ease-in-out"
                }}>
                <Slot/>
            </dialog>
        }
    </nav>
})