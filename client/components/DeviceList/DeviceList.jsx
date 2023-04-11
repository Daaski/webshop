import {observer} from "mobx-react-lite";
import {useContext} from "react";

import {Context} from "@/pages/_app";
import {DeviceItem} from "./DeviceItem";


export const DeviceList = observer(() => {
    const {device} = useContext(Context)
    return (
        <main style={{display: "flex", flexFlow:"row wrap", gridColumnGap: "30px"}}>
            {device.devices.map(device =>
                <DeviceItem key={device.id} device={device}/>
            )}
        </main>
    )
});