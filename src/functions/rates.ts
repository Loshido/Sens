import { RequestEvent, RequestEventAction } from "@builder.io/qwik-city"

type Rate = {
    interval: number,
    maximum: number,
    ips: {
        // ip -> [number of attempt, timestamp of last req]
        [ip: string]: [number, number]
    }
}

const rates: { [rate_id: string]: Rate } = {
    login: {
        interval: 1000 * 60 * 5,
        maximum: 8,
        ips: {}
    },
    register: {
        maximum: 2,
        interval: 1000 * 60 * 5,
        ips: {}
    }
}

export function exceedRate(rate_id: string, request: RequestEvent | RequestEventAction): boolean {
    const rate = rate_id in rates && rates[rate_id]
    if(!rate) return true

    const ip  = request.clientConn.ip
    if(!ip) return false;

    if(!(ip in rate.ips)) {
        rate.ips[ip] = [1, Date.now()]
        return false
    }

    rate.ips[ip][0]++
    if(rate.ips[ip][0] >= rate.maximum && rate.ips[ip][1] + rate.interval > Date.now()) {
        return true
    } else if(rate.ips[ip][0] >= rate.maximum) {
        rate.ips[ip][0] = 1   
    } 

    return false
}