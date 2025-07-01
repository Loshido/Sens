import { RequestHandler } from "@builder.io/qwik-city"
import { verify } from "~/lib/jwt"

const middleware: RequestHandler = async request => {
    const token = request.cookie.get('token')
    if(!token) throw request.redirect(302, '/login')

    const validation = await verify(token.value)
    if(!validation) throw request.redirect(302, '/login')
}

export default middleware

export const admin_middleware: RequestHandler = async request => {
    const token = request.cookie.get('token')
    if(!token) throw request.redirect(302, '/login')

    const validation = await verify(token.value)
    if(!validation) throw request.redirect(302, '/login')
    if(!validation.admin) throw request.redirect(302, '/dash')
}