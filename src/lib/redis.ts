import { createClient } from "redis"

const REDIS_HOST = process.env.REDIS_HOST || 'redis://localhost:6379/0'

const client = createClient({
    url: REDIS_HOST,
    disableClientInfo: true
})

export const connect = async () => {
    if(!client.isOpen || !client.isReady) {
        await client.connect()
    }
    return client 
}

process.addListener('beforeExit', client.destroy)
process.addListener('SIGABRT', client.destroy)
process.addListener('SIGQUIT', client.destroy)
process.addListener('SIGTERM', client.destroy)
process.addListener('SIGKILL', client.destroy)