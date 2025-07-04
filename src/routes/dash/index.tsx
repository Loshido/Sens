import { component$ } from "@builder.io/qwik";
import { type DocumentHead } from "@builder.io/qwik-city";
import AdvancedLink from "~/components/advanced-link";
import Article from "~/components/article";
import Star from "~/assets/icons/star.svg?jsx"

export default component$(() => {
    return <main class="p-4 flex flex-col gap-4 w-full h-full overflow-hidden">
        <Article
            scroll="full"
            href="/dash/events"
            title="Events coming soon">
            <div class="w-full h-40 my-4 bg-red-500 rounded"/>
            <div class="w-full h-40 my-4 bg-cyan-500 rounded"/>
        </Article>
        <Article
            scroll="partial"
            href="/dash/badge"
            title="Badge gallery">
            <div class="w-32 h-32 m-4 bg-red-500 rounded-xl"/>
            <div class="w-32 h-32 m-4 bg-cyan-500 rounded-xl"/>
            <div class="w-32 h-32 m-4 bg-emerald-500 rounded-xl"/>
            <div class="w-32 h-32 m-4 bg-indigo-500 rounded-xl"/>
            <div class="w-32 h-32 m-4 bg-fuchsia-500 rounded-xl"/>
            <div class="w-32 h-32 m-4 bg-violet-500 rounded-xl"/>
            <div class="w-32 h-32 m-4 bg-rose-500 rounded-xl"/>
            <div class="w-32 h-32 m-4 bg-yellow-500 rounded-xl"/>
        </Article>

        <AdvancedLink
            title="Leaderboard"
            href="/dash/leaderboard"
            subtitle="A look at rising stars"
            animation={{
                slot: <Star class="fill-[var(--color)]"/>,
                duration: 8,
                color: "#9902FD",
                number: 15,
                class: "bg-linear-90 from-sens/0 to-sens/50"
            }}/>
        <AdvancedLink
            title="Resources"
            href="/dash/#"
            subtitle="A fountain of knowledge"
            animation={{
                slot: <Star class="fill-[var(--color)]"/>,
                duration: 8,
                color: "#9902FD",
                number: 15,
                class: "bg-linear-90 from-sens/0 to-sens/50"
            }}/>
    </main>
})

export const head: DocumentHead = {
    title: "Home"
};