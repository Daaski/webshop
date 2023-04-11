import {useContext, useEffect} from 'react';
import {useRouter} from 'next/router';
import {Context} from "@/pages/_app";

//eslint-disable-next-line
export const withAuth = (WrappedComponent) => (props) => {
    const router = useRouter()
    const {user} = useContext(Context)

    useEffect(() => {
        if (!user.isAuth && router.pathname === '/basket') {
            router.replace("/")
        }

        if (!user.isAdmin && router.pathname === '/admin') {
            router.replace('/')
        }

    }, [user.isAuth, router])

    return <WrappedComponent {...props} />;
}

