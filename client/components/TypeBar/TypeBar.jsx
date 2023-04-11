import {observer} from "mobx-react-lite";
import {useContext} from "react";

import {Context} from "@/pages/_app";

import {ListBox} from "primereact/listbox";

export const TypeBar = observer(() => {
    const {device} = useContext(Context)

    const filter = device.types.map(type => type)

    const selectType = (e) => {
        if (e.value === null) {
            return
        }
        device.setSelectedType(e.value)
        console.log(device.setSelectedType)
    }

    return (
        <>
            <ListBox
                value={device.selectedType}
                onChange={(e) => selectType(e)}
                options={filter}
                optionLabel="name"
                className="w-full md:w-14rem" />
        </>
    )
});