import '@/styles/globals.css'
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { ProgressSpinner } from 'primereact/progressspinner';
import {createContext, useContext, useEffect, useState} from "react";
import {observer} from "mobx-react-lite";

import UserStore from "@/store/UserStore";
import DeviceStore from "@/store/DeviceStore";
import {NavBar} from "../../components/NavBar/NavBar";
import {check} from "@/http/userApi";

export const Context = createContext({user: null, device: null})
const userStore = new UserStore()
const deviceStore = new DeviceStore()


function App({Component, pageProps}) {
  const user = userStore
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      check()
          .then(data => {
            user.setUser(data)
            user.setIsAuth(true)
          })
          .finally(() => {
            setLoading(false)
          })
    }, 1000)
  }, [])

  if (loading) {
    return <ProgressSpinner style={{transform: "translate(45vw, 40vh)"}} />
  }

  return <>
    <Context.Provider value={{
      user: userStore,
      device: deviceStore
    }}>
      <NavBar />
      <Component {...pageProps} />
    </Context.Provider>
  </>
}

export default observer(App)