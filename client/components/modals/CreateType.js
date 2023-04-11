import {Dialog} from "primereact/dialog";
import {Button} from "primereact/button";
import {InputText} from "primereact/inputtext";
import {useState} from "react";

import {createType} from "@/http/deviceApi";


export const CreateType = ({ setVisible, visible }) => {
    const [value, setValue] = useState('')

    const addType = () => {
        createType(value)
            .then(data => {
                setValue('')
                setVisible(false)
            })
    }


    const footerContent = (
        <div>
            <Button label="Отмена" severity={"danger"} icon="pi pi-times" onClick={() => setVisible(false)} className="p-button-text" />
            <Button label="Добавить" severity={"success"} icon="pi pi-check" onClick={addType} autoFocus />
        </div>
    );

    return (
        <>
            <Dialog style={{display: "flex", flexDirection: "column"}} footer={footerContent} visible={visible} onHide={() => {setVisible(!visible)}}>
                <label>
                    <p style={{marginBottom: "10px"}}>Введите тип</p>
                    <InputText value={value}
                               onChange={(e) => {
                                   setValue(e.target.value)}}
                               style={{width: "100%"}} />
                </label>
            </Dialog>
        </>
    )
}

