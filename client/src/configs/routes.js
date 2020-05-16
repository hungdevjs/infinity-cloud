import Home from "../components/Home"
import ChatAndGame from "../components/ChatAndGame"
import Room from "../components/Room"

export default [
    { path: "/", component: Home },
    { path: "/chat", component: ChatAndGame },
    { path: "/game", component: ChatAndGame },
    { path: "/chat/:roomName", component: Room },
    { path: "/game/:roomName", component: Room },
]
