import React from "react"
import Home from "../pages/Home"
import FileInFolder from '../pages/FileInFolder'

const HomePage = () => <Home isDeleted={false} />
const TrashPage = () => <Home isDeleted={true} />

export default [
    { path: "/", component: HomePage, isLogged: true },
    { path: "/trash", component: TrashPage, isLogged: true },
    { path: "/folder/:id", component: FileInFolder, isLogged: true }
]
