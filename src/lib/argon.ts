import { hashSync, verifySync } from "@node-rs/argon2"

const SECRET = process.env.HASH_SECRET
if(!SECRET) throw new Error("[lib/argon] HASH_SECRET environment variable is missing")

const encoder = new TextEncoder()
const secret = encoder.encode(SECRET)

export const hash = (password: string): string => 
    hashSync(password, { secret })

export const compare = (password: string, hash: string): boolean => 
    verifySync(hash, password, { secret })