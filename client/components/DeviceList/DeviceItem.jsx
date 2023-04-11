import {Card} from "primereact/card";
import Image from "next/image";
import {useRouter} from "next/router";
import {useContext} from "react";

import {myLoader} from "@/lib/myLoader";
import {DEVICE_ROUTE} from "@/utils/consts";
import {Context} from "@/pages/_app";



export const DeviceItem = ({device}) => {
    const router = useRouter()
    const context = useContext(Context)
    const currentBrand = context.device.brands.find(brand => brand.id === device.brandId)
    const imageSrc = device.img


    const header = (
        <Image alt="Device Image"  loader={myLoader}  width={170} height={170} src={imageSrc}/>
    );

    const footer = (
        <div>
            Рейтинг: {device.rating}✩
        </div>
    );

    return (
        <Card  onClick={() => router.push(`${DEVICE_ROUTE}/${device.id}`)}
              style={{textAlign: "center", cursor:"pointer", marginBottom: "30px", width: "225px"}}
              header={header}
              subTitle={currentBrand?.name}
              footer={footer}
              title={device.name}
        >

        </Card>
    )
};