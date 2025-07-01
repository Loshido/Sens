import { component$, useSignal, useStore } from "@builder.io/qwik";
import { type DocumentHead, routeAction$, z, zod$ } from "@builder.io/qwik-city";
import { exceedRate } from "~/functions/rates";

import { compare } from "~/lib/argon";
import { log } from "~/lib/fs";
import { sign, verify } from "~/lib/jwt";
import { connect } from "~/lib/redis";

export const useLogin = routeAction$(async (data, req) => {
    if(exceedRate('login', req)) {
        return { exceeds: true }
    }

    const token = req.cookie.get('token')
    if(token && await verify(token.value)) {
        throw req.redirect(302, '/dash')
    }

    const client = await connect()

    const password = await client.hGet('password', data.username)
    if(!password || compare(data.password, password) === false) {
        return { failed: true }
    }
    
    const id = req.clientConn.ip 
        ? `${data.username} (${req.clientConn.ip})`
        : data.username
    log(`${id} logged in`, 'auth')
    const jwt = await sign({
        username: data.username,
        admin: false
    })

    const expires = new Date(Date.now() + 1000 * 60 * 60 * 12)
    req.cookie.set('token', jwt, {
        expires,
        path: '/'
    })
    throw req.redirect(302, '/dash')
}, zod$({
    username: z.string().max(8),
    password: z.string().min(6)
}))

export default component$(() => {
    const login = useLogin()
    const data = useStore({
        username: '',
        password: ''
    })
    const error = useSignal('')

    return <section class="w-dvw max-w-dvw h-dvh p-8 flex flex-col justify-between">
        <header>
            <h1 class="font-bold text-6xl leading-16">
                SENS
            </h1>
            <p class="font-light text-2xl">
                Learn with <span class="text-sens">ease</span> & <span class="text-sens">enthusiasm</span>
            </p>
        </header>
        <main class="flex flex-col gap-2" 
            window:onKeyDown$={async (event) => {
                if(event.key != 'Enter') return
                if(data.username.length > 8) {
                    error.value = `Your username is too long, make sure it does not exceed 8 characters.`
                    return
                } 
                if(data.password.length < 6) {
                    error.value = `Your password is too short, make sure it has at least 6 characters.`
                    return
                }
                const response = await login.submit(data)
                if(response.value.failed) {
                    error.value = `Your attempt failed`
                } else if(response.value.exceeds) {
                    error.value = `You have exceeded the number of attempts allowed, retry in 5 minutes.`
                }
            }}>
            <label class="text-2xl font-medium">
                Login
            </label>
            <input 
                onInput$={(_, t) => data.username = t.value.toLowerCase()}
                type="text" placeholder="username"
                autoComplete="username"
                class="rounded outline-none lowercase
                    py-2 px-3 text-xl bg-black/5"/>
            <input 
                onInput$={(_, t) => data.password = t.value}
                type="password" placeholder="password"
                autoComplete="new-password"
                class="rounded outline-none 
                    py-2 px-3 text-xl bg-black/5"/>
            {
                error.value.length > 0 && <p 
                    class="py-2 px-3 bg-red-50 rounded text-red-400">
                    { error.value }
                </p>
            }
            
            <a href="/register"
                class="text-sens text-sm">
                register
            </a>
        </main>
        <footer class="text-black/25 text-center w-full">
            Made for IsenEngineering by Livio Ardoin
        </footer>
    </section>
})

export const head: DocumentHead = {
    title: "Login"
};