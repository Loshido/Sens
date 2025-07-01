import { component$ } from "@builder.io/qwik";
import { Form, type DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
    return <section class="w-dvw h-dvh p-8 flex flex-col justify-between">
        <header>
            <a href="/login"
                class="text-sens text-sm">
                go back
            </a>
        </header>
        <Form class="flex flex-col gap-2">
            <label class="text-2xl font-medium">
                Ask to change password
            </label>
            <input 
                type="text" placeholder="username"
                autoComplete="username"
                class="rounded outline-none 
                    py-2 px-3 text-xl bg-black/5"/>
            <input 
                type="password" placeholder="new password"
                autoComplete="new-password"
                class="rounded outline-none 
                    py-2 px-3 text-xl bg-black/5"/>
            <p class="text-xs">
                You need to ask an admin to validate your change once you asked
            </p>
        </Form>
        <footer class="text-black/25 text-center w-full">
            Made for IsenEngineering by Livio Ardoin
        </footer>
    </section>
})

export const head: DocumentHead = {
    title: "Forgot password"
};