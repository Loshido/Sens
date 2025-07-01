import { component$, Slot, useSignal } from "@builder.io/qwik";
import Nav from "~/components/nav";
import { Link, useLocation } from "@builder.io/qwik-city";

const liens = [
    {
        slot: <>
            Home
        </>,
        href: '/dash/'
    },
    {
        slot: <>
            Events
        </>,
        href: '/dash/events'
    },
    {
        slot: <>
            Badges
        </>,
        href: '/dash/badges'
    },
    {
        slot: <>
            Leaderboard
        </>,
        href: '/dash/leaderboard'
    },
    {
        slot: <>
            Me
        </>,
        href: '/dash/me'
    },
    {
        slot: <>
            Settings
        </>,
        href: '/dash/settings'
    },
]
const Links = ({ pathname }: {pathname: string}) => liens.map(lien => <Link 
    key={lien.href}
    class={[
        "text-2xl font-semibold px-3 py-2 hover:bg-sens/10",
        "transition-colors rounded cursor-pointer select-none duration-500",
        pathname == lien.href && 'bg-sens/5 hover:bg-sens/5'
    ]}
    href={lien.href}>
    { lien.slot }
</Link>)

export default component$(() => {
    const open = useSignal(false)
    const locations = useLocation()
    return <>
        <Nav open={open} class="flex flex-col p-4 gap-1">
            <Links pathname={locations.url.pathname}/>
        </Nav>
        <Slot/>
    </>
})