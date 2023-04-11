import {observer} from "mobx-react-lite";
import {useContext} from "react";
import { Button } from 'primereact/button';

import {Context} from "@/pages/_app";

import css from "./Brand.module.css"

export const BrandBar = observer(() => {
    const {device} = useContext(Context)

    return (
        <aside className={css.Container}>
            {device.brands.map(brand =>
                <Button onClick={() => device.setSelectedBrand(brand)} key={brand.id} link rounded label={brand.name} />
            )}
        </aside>
    )
});