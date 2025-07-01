import { component$, useSignal, useStore } from "@builder.io/qwik";
import { routeAction$, z, zod$, type DocumentHead } from "@builder.io/qwik-city";
import { exceedRate } from "~/functions/rates";
import { hash, compare } from "~/lib/argon";
import { sign } from "~/lib/jwt";
import { connect } from "~/lib/redis";
import { log } from "~/lib/fs";
import Flow from "~/components/flow";

export const useRegister = routeAction$(async (data, req) => {
    if(exceedRate('register', req)) {
        return { exceeds: true }
    }
    const client = await connect()

    const exists = await client.hGet('password', data.username)
    if(!exists) {
        const hashed = hash(data.password)
        await client.hSet('password', data.username, hashed)

        const id = req.clientConn.ip 
            ? `${data.username} (${req.clientConn.ip})`
            : data.username
        log(`${id} registered`, 'auth')
    } else if(compare(data.password, exists) === false) {
        return { failed: true }
    }
    
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
    const register = useRegister()
    const data = useStore({
        username: '',
        password: ''
    })
    const error = useSignal('')

    return <section class="w-dvw h-dvh p-8 flex flex-col justify-between">
        <Flow/>
        <header>
            <h1 class="font-bold text-6xl leading-16 w-fit shining">
                SENS
            </h1>
            <p class="font-light text-2xl">
                Learn with <span class="text-sens">ease</span> & <span class="text-sens">constency</span>
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
                const response = await register.submit(data)
                if(response.value.exceeds) {
                    error.value = `You have exceeded the number of attempts allowed, retry in 5 minutes.`
                }
            }}>
            <label class="text-2xl font-medium">
                Register as new operator
            </label>
            <input 
                onInput$={(_, t) => data.username = t.value.toLowerCase()}
                type="text" placeholder="username"
                autoComplete="username"
                class="rounded outline-none lowercase
                    py-2 px-3 text-xl bg-black/5"/>
            <input 
                onInput$={(_, t) => data.password = t.value}
                type="password" placeholder="new password"
                autoComplete="new-password"
                class="rounded outline-none 
                    py-2 px-3 text-xl bg-black/5"/>
            {
                error.value.length > 0 && <p 
                    class="py-2 px-3 bg-red-50 rounded text-red-400">
                    { error.value }
                </p>
            }
            <div>
                <p class="text-sm text-black/25">
                    Press enter to register
                </p>
                <a href="/login"
                    class="text-sens text-sm">
                    login
                </a>
            </div>
        </main>
        <footer class="text-black/25 text-center w-full">
            Made for IsenEngineering by Livio Ardoin
        </footer>
    </section>
})

export const head: DocumentHead = {
    title: "Register"
};