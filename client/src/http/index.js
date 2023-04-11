import ky from "ky"

const $host = ky.extend({
    prefixUrl: process.env.NEXT_PUBLIC_API_URL,
    hooks: {
        beforeError: [
            async error => {
                    error.message = (await error.response.json()).message
                    return error
            }
        ]
    }
})

const authInterceptor = request => {
    request.headers.set('authorization', `Bearer ${localStorage.getItem('token')}`)
}

const $authHost = ky.extend({
    prefixUrl: process.env.NEXT_PUBLIC_API_URL,
    hooks: {
        beforeRequest: [
            request => {
                authInterceptor(request)
        }
        ]
    }
})



export {
    $host,
    $authHost
}