import {makeAutoObservable} from "mobx";

export default class DeviceStore {
    constructor() {
        this._types = []
        this._brands = []
        this._devices = []
        this._selectedType = {}
        this._selectedBrand = {}
        this._page = 1
        this._totalCount = 0
        this._limit = 3
        makeAutoObservable(this)
    }

    setTypes(types) {
        this._types = types
    }
    setSelectedType(type) {
        this._selectedType = type
    }
    setBrands(brands) {
        this._brands = brands
    }
    setSelectedBrand(brand) {
        this._selectedBrand = brand
    }
    setDevices(devices) {
        this._devices = devices
    }
    setPage(page) {
        this._page = page
    }
    setTotalCount(count) {
        this._totalCount = count
    }

    get types() {
        return this._types
    }
    get selectedType() {
        return this._selectedType
    }
    get brands() {
        return this._brands
    }

    get selectedBrand() {
        return this._selectedBrand
    }
    get devices() {
        return this._devices
    }
    get totalCount() {
        return this._totalCount
    }
    get page() {
        return this._page
    }
    get limit() {
        return this._limit
    }
}