import {useState} from "react";
import {Button} from "primereact/button";

import {withAuth} from "../../components/withAuth";
import {CreateType} from "../../components/modals/CreateType";
import {CreateDevice} from "../../components/modals/CreateDevice";
import {CreateBrand} from "../../components/modals/CreateBrand";


import css from "../styles/Admin.module.css"

const Admin = () => {
    const [typeVisible, setTypeVisible] = useState(false)
    const [brandVisible, setBrandVisible] = useState(false)
    const [deviceVisible, setDeviceVisible] = useState(false)

    return (
        <div className={css.Container}>
                <Button onClick={() => {setTypeVisible(!typeVisible)}} className={css.Admin_button} label={"Добавить тип"}/>
                <Button onClick={() => {setBrandVisible(!brandVisible)}} className={css.Admin_button} label={"Добавить бренд"}/>
                <Button onClick={() => {setDeviceVisible(!deviceVisible)}} className={css.Admin_button} label={"Добавить устройство"}/>
            <CreateType visible={typeVisible} setVisible={setTypeVisible}/>
            <CreateBrand visible={brandVisible} setVisible={setBrandVisible}/>
            <CreateDevice visible={deviceVisible} setVisible={setDeviceVisible}/>
        </div>
    );
};

export default withAuth(Admin)