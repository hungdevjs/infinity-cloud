import { useState } from "react"

export default () => {
    const [isOpen, setIsOpen] = useState(false)

    const toggle = () => setIsOpen(!isOpen)

    return [isOpen, toggle]
}