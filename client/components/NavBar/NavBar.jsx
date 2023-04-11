import Link from "next/link";
import {useContext} from "react";
import { Button } from "primereact/button"
import classNames from "classnames";
import {observer} from "mobx-react-lite";

import {ADMIN_ROUTE, LOGIN_ROUTE} from "@/utils/consts";
import {Context} from "@/pages/_app";

import css from "./Navbar.module.css"


export const NavBar = observer(() => {
    const {user} = useContext(Context)

    const logout = () => {
        user.setUser({})
        user.setIsAuth(false)
    }

    return (
        <nav className={css.Navbar}>
            <Link href="/" >
                <Button className={classNames(css.Navbar_item, css.Navbar_item_home)}
                        severity={"secondary"}
                        label="Купить девайс!"
                        link
                />
            </Link>
            {user.isAuth ?
                <div className={css.Navbar_button}>
                    <Link href={ADMIN_ROUTE}>
                        <Button severity={"warning"}
                                label="Админ панель"
                                className={classNames(css.Navbar_item)}
                                link
                    />
                    </Link>
                        <Button onClick={logout} label="Выйти"/>
                </div>
                :
                    <Link className={css.Navbar_button} href={LOGIN_ROUTE}>
                        <Button label={"Авторизироваться"}/>
                    </Link>
            }
        </nav>
    );
})


