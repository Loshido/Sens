import { component$ } from "@builder.io/qwik";
import { QwikCityProvider, RouterOutlet } from "@builder.io/qwik-city";
import { RouterHead } from "./components/router-head/router-head";

import "./global.css";

export default component$(() => {
    return <QwikCityProvider>
        <head>
            <meta charset="utf-8" />
            {/* {
                !isDev && 
                <link rel="manifest"
                    href={`${location.origin}/manifest.json`}/>
            } */}
            <RouterHead />
        </head>
        <body lang="fr">
            <RouterOutlet />
        </body>
    </QwikCityProvider>
});
