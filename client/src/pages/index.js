import {memo, useContext, useEffect} from "react";
import {observer} from "mobx-react-lite";

import {TypeBar} from "../../components/TypeBar";
import {BrandBar} from "../../components/BrandBar";
import {DeviceList} from "../../components/DeviceList";
import {fetchBrands, fetchDevices, fetchTypes} from "@/http/deviceApi";
import {Context} from "@/pages/_app";

import css from '@/styles/Home.module.css'
import {Pages} from "../../components/Pages/Pages";

const Home = memo(observer(({ types, brands, devices }) => {
    const {device} = useContext(Context)
    device.setTypes(types)
    device.setBrands(brands)
    device.setDevices(devices.rows)
    device.setTotalCount(devices.count)

    useEffect(() => {
        fetchDevices(device.selectedType.id, device.selectedBrand.id, device.page, 3)
            .then(data => {
                device.setDevices(data.rows)
                device.setTotalCount(data.count)
            })
    }, [device.selectedType, device.selectedBrand, device.page])

    return (
        <div className={css.Container}>
           <aside>
               <TypeBar />
           </aside>
           <div className={css.Shop_wrapper}>
               <BrandBar />
               <DeviceList/>
               <Pages/>
           </div>
        </div>
    );
}))



export async function getServerSideProps() {
    const types = await fetchTypes()
    const brands = await fetchBrands()
    const devices = await fetchDevices("", "", 1, 3)
    return {
        props: {
            types,
            brands,
            devices
        }
    }
}

export default Home