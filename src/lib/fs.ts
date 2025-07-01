import fs from "fs"

const DIR_LOGS = process.env.DIR_LOGS || "data/logs/"

export const log = (message: string, channel?: string): void => {
    const t = new Date() 
        .toISOString() // 2025-07-01T12:16:13.319Z
    const date = t.slice(0, 10) // 2025-07-01
    const time = t.slice(11, 19)
    const path = DIR_LOGS + date + (channel ? `.${channel}.log` : `.log`)
    fs.appendFileSync(path, `[${time}] ` + message + '\n', {
        flag: 'a'
    })
}

export const read = (path: string): string => {
    return fs.readFileSync(path, { encoding: 'utf-8' })
}

export const write = (path: string, data: string) => {
    fs.writeFileSync(path, data, { encoding: 'utf-8' })
}