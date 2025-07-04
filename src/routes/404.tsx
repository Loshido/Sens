import { component$ } from "@builder.io/qwik";
import { type DocumentHead, Link } from "@builder.io/qwik-city";
import Flow from "~/components/flow";

export default component$(() => <section
    style={{
        "--flow-height": "100dvh",
        "--flow-duration": "15s"
    }}
    class="relative h-dvh w-dvw flex items-center justify-center flex-col gap-5">
    <Flow/>
    <h1 class="h-fit w-fit text-3xl font-semibold relative">
        <span class="text-9xl font-black absolute top-[-325%] left-0 w-full -z-10 text-center
            text-sens/25">
            404
        </span>
        This page <span class="text-white bg-sens px-2 py-1">doesn't exist</span>.
    </h1>
    <Link href="/login"
        class="text-sens hover:text-sens/50 transition-colors">
        Navigate to safezone
    </Link>
</section>)

export const head: DocumentHead = {
    links: [
        {
            rel: 'stylesheet',
            href: '/style/flow.css'
        }
    ]
};