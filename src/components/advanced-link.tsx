import { component$, type JSXOutput } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

interface Props {
    title: string,
    href: string
    subtitle?: string,
    animation?: {
        slot: JSXOutput,
        duration: number,
        color: string,
        number: number,
        class?: string
    }
}
export default component$(({ title, href, subtitle, animation }: Props) => {
    return <Link href={href} class="rounded bg-black/5 p-4 relative -z-10">
        <h1 class="text-2xl font-bold">
            { title }
        </h1>
        <h4>
            { subtitle }
        </h4>
        {
            animation && <ul class={`absolute top-0 right-0 list-none
                w-1/2 h-full overflow-hidden -z-10 rounded
                ${ animation.class }`}>
                {
                    [...Array(animation.number)].map(() => {
                        const size = 10 + Math.floor(Math.random() * 75)
                        const dduration = 1 + Math.random() / 4 - 0.125
                        const duration = animation.duration * dduration
                        const rotation = Math.floor(Math.random() * 900) - 450
                        const alpha = Math.floor(200 * Math.random())
                        const delay = Math.floor(Math.random() * animation.duration * 1000)
                        const top = Math.floor(Math.random() * 80)
                        return <li
                            class={`absolute block opacity-0 
                                *:w-[${size}px] *:h-[${size}px]`}
                            style={{
                                top: `${top}%`,
                                height: `${size}px`,
                                width: `${size}px`,
                                animation: `flying-animation ${duration * 1000}ms linear infinite`,
                                animationDelay: `${delay}ms`,
                                '--rotation': `${rotation}deg`,
                                '--color': `${animation.color}` + alpha.toString(16).padStart(2, '0'),
                            }}>
                            { animation.slot }
                        </li>
                    })
                }
            </ul>
        }
    </Link>
})