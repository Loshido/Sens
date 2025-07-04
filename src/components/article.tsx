import { component$, Slot } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import Chevron from "~/assets/icons/chevron.svg?jsx"

interface Props {
    href?: string,
    title: string,
    scroll: 'full' | 'partial' | 'none'
}

export default component$(({ href, title, scroll }: Props) => <article class="w-full h-full">
    <Link href={href}
        class="flex flex-row gap-4 items-center
        text-2xl font-bold leading-10
        select-none cursor-pointer transition-colors
        hover:text-black/50 hover:*:stroke-black/50">
        { title }
        <Chevron class="w-4 h-4 mt-2 stroke-black stroke-2 transition-colors"/>
    </Link>
    {
        scroll == 'full' && <section class="w-[calc(100% + 16px)] px-4 -mx-4 flex flex-row gap-2 flex-nowrap 
            overflow-x-scroll snap-x snap-mandatory
            *:basis-full *:shrink-0 *:grow-0 *:snap-center">
            <Slot/>
        </section>
    }
    {
        scroll == 'partial' && <section class="w-[calc(100% + 16px)] px-4 -mx-4 flex flex-row gap-2 flex-nowrap 
            overflow-x-scroll snap-x snap-mandatory
            *:shrink-0 *:grow-0 *:snap-center">
            <Slot/>
        </section>
    }
    {
        scroll == 'none' && <section class="w-full flex flex-row gap-2 flex-nowrap ">
            <Slot/>
        </section>
    }
</article>)