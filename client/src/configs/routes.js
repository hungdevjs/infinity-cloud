import React from "react"
import Home from "../pages/Home"
import Recent from "../pages/Recent"
import Star from "../pages/Star"

const HomePage = () => <Home isDeleted={false} />
const TrashPage = () => <Home isDeleted={true} />

export default [
    { path: "/", component: HomePage, isLogged: true },
    { path: "/recent", component: Recent, isLogged: true },
    { path: "/stars", component: Star, isLogged: true },
    { path: "/trash", component: TrashPage, isLogged: true },
]
