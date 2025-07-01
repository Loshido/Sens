import type { DocumentHead } from "@builder.io/qwik-city";

export const head: DocumentHead = ({ head }) => ({
    title: head.title.length > 0 
        ? "Sens - " + head.title 
        : "Sens",
    meta: [
        {
            name: "description",
            content: "Enhances the experience of students with events",
        },
    ],
});