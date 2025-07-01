import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
    return <h1 class="text-black text-4xl">
        Hi 😘
    </h1>
});

export const head: DocumentHead = {
    title: "Sens",
    meta: [
        {
            name: "description",
            content: "Enhances the experience of students with events",
        },
    ],
};
