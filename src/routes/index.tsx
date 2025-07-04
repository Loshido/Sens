import { type RequestHandler } from "@builder.io/qwik-city/middleware/request-handler";

export const onRequest: RequestHandler = request => {
    if(request.cookie.has('token')) throw request.redirect(302, '/dash')
    else throw request.redirect(302, '/login')
}