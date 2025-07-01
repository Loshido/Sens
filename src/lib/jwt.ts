import { decodeJwt, SignJWT, jwtVerify, type JWTPayload } from "jose";

interface Payload extends JWTPayload {
    username: string,
    admin: boolean
}

const JWT_SECRET = process.env.JWT_SECRET
if(!JWT_SECRET) throw new Error(`[lib/jwt] JWT_SECRET environment variable is missing`)
const ISSUER = 'loshido-sens'
const AUDIENCE = 'sens-ie' 

export const decode = (jwt: string) => {
    return decodeJwt(jwt)
}

export const sign = async (payload: Payload) => {
    const secret = new TextEncoder().encode(JWT_SECRET)
    const alg = 'HS256'

    const jwt = await new SignJWT(payload)
        .setProtectedHeader({ alg })
        .setIssuedAt()
        .setIssuer(ISSUER)
        .setAudience(AUDIENCE)
        .setExpirationTime('12h')
        .sign(secret)
    return jwt
}

export const verify = async (jwt: string) => {
    const secret = new TextEncoder().encode(JWT_SECRET)

    try {
        const { payload } = await jwtVerify<Payload>(jwt, secret, {
            issuer: ISSUER,
            audience: AUDIENCE,
        })
        return payload
    } catch(error) {
        return null
    }
} 