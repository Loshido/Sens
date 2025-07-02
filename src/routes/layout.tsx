import { component$, Slot } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import Notifications from "~/components/notifications";

export default component$(() => {
    return <>
        <Notifications/>
        <Slot/>
    </>
})

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