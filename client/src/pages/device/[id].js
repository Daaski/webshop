import {useState} from "react";
import Image from "next/image";
import {Card} from "primereact/card";
import {Button} from "primereact/button"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import {fetchDevices, fetchOneDevice} from "@/http/deviceApi";
import {myLoader} from "@/lib/myLoader";

import Star from "../../assets/star.png"
import css from "../../styles/Device.module.css"



const Device = ({ device }) => {
    const src = device.img

    const columns = [
        {field: 'title', header: 'Описание'},
        {field: 'description', header: 'Кол-во'},
    ];

    return (
        <div className={css.Container}>
            <section className={css.Header_section}>
                <Image width={300} height={300} alt={"Device img"} src={src} loader={myLoader}/>
                <div className={css.Star}>
                    <h2>{device.name}</h2>
                    <div className={css.Star}>
                        <Image width={300} height={300}  src={Star}  alt={"Rating icon"}/>
                        <h2>Рейтинг: {device.rating}</h2>
                    </div>
                </div>
                <Card>
                    <h2 style={{paddingBottom: "30px"}}>От: {device.price}</h2>
                    <Button label={"Добавить в корзину!"}/>
                </Card>
            </section>
            <main style={{width: "100%"}}>
                <h1>Характеристики</h1>
              {/*  <DataTable style={{textAlign: "left"}} value={description}>
                    {columns.map(column => (
                            <Column key={column.field} field={column.field} header={column.header} />
                    ))}
                </DataTable>*/}
            </main>
        </div>
    );
};

/*export async function getServerSideProps(ctx) {
    const {id} = ctx.params

    const device = await fetchOneDevice(id)

    return {
        props: {device}
    }
}*/

export async function getStaticPaths() {
    const {count} = await fetchDevices()

    let paths = []

    for (let i = 0; i<=count; i++) {
        paths = [...paths, {params: {id: i.toString()}}]
    }

    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps(ctx) {
    const {id} = ctx.params

    const device = await fetchOneDevice(id)

    return {
        props: {device}
    }
}



export default Device