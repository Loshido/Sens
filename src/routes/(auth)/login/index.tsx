import { component$ } from "@builder.io/qwik";
import { type DocumentHead, Form } from "@builder.io/qwik-city";

export default component$(() => {
    return <section class="w-dvw h-dvh p-8 flex flex-col justify-between">
        <header>
            <h1 class="font-bold text-6xl leading-16">
                SENS
            </h1>
            <p class="font-light text-2xl">
                Learn with <span class="text-sens">ease</span> & <span class="text-sens">enthusiasm</span>
            </p>
        </header>
        <Form class="flex flex-col gap-2">
            <label class="text-2xl font-medium">
                Login
            </label>
            <input 
                type="text" placeholder="username"
                autoComplete="username"
                class="rounded outline-none 
                    py-2 px-3 text-xl bg-black/5"/>
            <input 
                type="password" placeholder="password"
                autoComplete="current-password"
                class="rounded outline-none 
                    py-2 px-3 text-xl bg-black/5"/>

            <a href="/pwd"
                class="text-sens text-sm">
                password forgotten
            </a>
            <a href="/register"
                class="text-sens text-sm">
                register
            </a>
        </Form>
        <footer class="text-black/25 text-center w-full">
            Made for IsenEngineering by Livio Ardoin
        </footer>
    </section>
})

export const head: DocumentHead = {
    title: "Login"
};