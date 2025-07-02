import { component$ } from "@builder.io/qwik";
import notification from "~/lib/notification";

export default component$(() => {
    return <>
        <section class="w-dvw p-8">
            <h1 class="text-black text-4xl font-inter font-black">
                Hey 😘
            </h1>
            <p class="text-sens/50">
                Cette page n'est pas fini
            </p>
        </section>
    </>
});