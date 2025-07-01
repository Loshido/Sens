import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
    return <>
        <h1 class="text-2xl font-bold p-4">
            Settings
        </h1>
    </>
})

export const head: DocumentHead = {
    title: "Settings"
};