import {useContext, useState} from "react";
import {Dialog} from "primereact/dialog";
import {InputText} from "primereact/inputtext";
import { InputNumber } from 'primereact/inputnumber';
import {Button} from "primereact/button";
import { Dropdown } from 'primereact/dropdown';
import { FileUpload } from 'primereact/fileupload';
import {observer} from "mobx-react-lite";

import {Context} from "@/pages/_app";
import {createDevice} from "@/http/deviceApi";




export const CreateDevice = observer(({ setVisible, visible }) => {
    const {device} = useContext(Context)
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [file, setFile] = useState('')
    const [info, setInfo] = useState([])

    const selectFile = (e) => {
        setFile(e.files[0])
    }

    const addInfo = () => {
        setInfo([...info, {title: "", description: "", number: Date.now()}])
    }
    
    const changeInfo = (key, value, number) => {
        setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i))
    }
    
    const removeInfo = (number) => {
        setInfo(info.filter(i => i.number !== number))
    }

    const submitForm = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('name', name)
        formData.append('price', price.toString())
        formData.append('brandId', device.selectedBrand.id)
        formData.append('typeId', device.selectedType.id)
        formData.append('img', file)
        formData.append('info', JSON.stringify(info))
        createDevice(formData)

        setVisible(false)
    }

    const footerContent = (
        <div>
            <Button label="Отмена" severity={"danger"} icon="pi pi-times" onClick={() => setVisible(false)} className="p-button-text" />
            <Button label="Добавить"
                    severity={"success"}
                    icon="pi pi-check"
                    type="submit"
                    onClick={(e) => submitForm(e)}
                    autoFocus
            />
        </div>
    );

    const canselLabel = (
        <Button label={"Отмена"}/>
    )



    return (
        <>
            <Dialog header={<h1>Добавить девайс</h1>} style={{display: "flex", flexDirection: "column"}} footer={footerContent} visible={visible} onHide={() => {setVisible(!visible)}}>
                <form onSubmit={submitForm}>
                    <Dropdown value={device.selectedType}
                              onChange={(e) => device.setSelectedType(e.value)}
                              options={device.types}
                              optionLabel={"name"}
                              placeholder={"Выберите тип"}
                              style={{width: "100%", marginTop: "10px"}}
                    />
                    <Dropdown value={device.selectedBrand}
                              onChange={(e) => device.setSelectedBrand(e.value)}
                              options={device.brands}
                              optionLabel={"name"}
                              placeholder={"Выберите бренд"}
                              style={{width: "100%", marginTop: "10px", marginBottom: "10px"}}
                    />

                    <InputText value={name}
                               onChange={(e) => setName(e.target.value)}
                               style={{width: "100%", marginBottom: "10px"}}
                               placeholder={"Введите название устройства"} />
                    <InputNumber value={price}
                                 onChange={(e) => setPrice(Number(e.value))}
                                 placeholder={"Введите цену"}
                                 style={{width: "100%", marginBottom: "10px"}} />
                    <FileUpload
                                onSelect={selectFile}
                                cancelOptions={{label: "Отмена"}}
                                uploadOptions={{style: {display: "none"}}}
                                chooseLabel={"Выберите изображение"} />
                    <Button type={"button"} style={{margin: "10px 0 20px 0"}} onClick={addInfo} label={"Добавить новое свойство"}/>
                    {info.map(i => (
                        <div key={i.number} style={{display: "flex", justifyContent: "space-between", paddingBottom: "20px"}}>
                            <InputText
                                value={i.title}
                                onChange={(e) => changeInfo('title', e.target.value, i.number)}
                                style={{width: "40%"}}
                                className="p-inputtext-sm"
                                placeholder={"Введите название свойства"} />
                            <InputText
                                value={i.description}
                                onChange={(e) => changeInfo('description', e.target.value, i.number)}
                                style={{width: "40%"}}
                                className="p-inputtext-sm"
                                placeholder={"Введите описание свойства"} />
                            <Button onClick={() => removeInfo(i.number)} type={"button"} severity={"danger"} label={"Удалить"}/>
                        </div>
                    ))}
                </form>
            </Dialog>
        </>
    )
})

