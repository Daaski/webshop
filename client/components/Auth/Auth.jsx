import {Card} from "primereact/card";
import {InputText} from "primereact/inputtext"
import cn from "classnames";
import {useRouter} from "next/router";
import {Button} from "primereact/button";
import Link from "next/link";
import {useContext, useState} from "react";
import {observer} from "mobx-react-lite";

import {Context} from "@/pages/_app";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "@/utils/consts";
import {registration, login} from "@/http/userApi";

import css from "./Auth.module.css"



export const Auth = observer(() => {
    const {user} = useContext(Context)
    const router = useRouter()
    const [userData, setUserData] = useState({email:"", password:""})
    const isLogin = router.pathname === LOGIN_ROUTE

    const inputValue = (value, name) => {
        setUserData({...userData, [name]: value})
    }

    const click = async () => {
        try {
            let data
            if (isLogin) {
                data = await login(userData.email, userData.password)
            } else {
                data = await registration(userData.email, userData.password)
            }
            user.setUser(data)
            user.setIsAuth(true)
            await router.push(SHOP_ROUTE)
        } catch (e) {
            alert(e.message)
        }
    }

    return (
        <div className={css.Container}
             >
            <Card className={css.Form_layout}>
                <h2 className={css.Auth_header}>{isLogin ? "Авторизация" : "Регистрация"}</h2>
                <form onSubmit={(e) => e.preventDefault()} className={css.Form}>
                    <span className={cn(css.Auth_input, "p-float-label")}>
                        <InputText
                            value={userData.email}
                            onChange={(e) => inputValue(e.target.value, "email")}
                            name={"email"}
                            type="email"
                            id="email"/>
                        <label htmlFor="email">Email</label>
                    </span>
                    <span className={cn(css.Auth_input, "p-float-label")}>
                        <InputText
                            value={userData.password}
                            onChange={(e) => inputValue(e.target.value, "password")}
                            name={"password"}
                            type={"password"}
                            id="password"/>
                        <label htmlFor="password">Пароль</label>
                    </span>
                    <span className={css.Subtitle}>
                        {isLogin ?
                            <p>Нет аккаунта?<Link style={{color: "blue"}} href={REGISTRATION_ROUTE}>Зарегестрироваться!</Link></p>
                            :
                            <p>Есть аккаунт?<Link style={{color: "blue"}} href={LOGIN_ROUTE}>Войти!</Link></p>
                        }

                    </span>
                        <Button onClick={click} type={"submit"} label={isLogin ? "Авторизироваться" : "Зарегестрироваться"} />
                </form>
            </Card>
        </div>
    );
})
