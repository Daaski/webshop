import {$authHost, $host} from "@/http/index";


export const createType = async (typeName) => {
    return await $authHost.post('api/type', {
        json: {name: typeName}
    }).json();
}

export const fetchTypes = async () => {
    return await $host.get('api/type').json()
}

export const createBrand = async (brandName) => {
    return await $authHost.post('api/brand', {
        json: {name: brandName}
    }).json();
}

export const fetchBrands = async () => {
    return await $host.get('api/brand').json()
}

export const createDevice = async (device) => {
    return await $authHost.post('api/device', {
        body: device
    }).json();
}

export const fetchDevices = async (typeId, brandId, page = 1, limit = 2) => {
    return await $host.get('api/device', {
        searchParams: {
            typeId: typeId === undefined ? "" : typeId,
            brandId: brandId === undefined ? "" : brandId,
            page,
            limit
        },
    }).json()
}

export const fetchOneDevice = async (id) => {
    return await $host.get('api/device/' + id).json()
}