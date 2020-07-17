import Home from "../pages/Home"
import MyCloud from "../pages/MyCloud"
import Recent from "../pages/Recent"
import Star from "../pages/Star"
import Trash from "../pages/Trash"

export default [
    { path: "/", component: Home, isLogged: true },
    { path: "/my-cloud", component: MyCloud, isLogged: true },
    { path: "/recent", component: Recent, isLogged: true },
    { path: "/stars", component: Star, isLogged: true },
    { path: "/trash", component: Trash, isLogged: true },
]
