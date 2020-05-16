import React, { useState } from "react"

export const UserContext = React.createContext()

export default (props) => {
    const [username, setUsername] = useState("")

    return (
        <UserContext.Provider
            value={{
                username,
                setUsername,
            }}
        >
            {props.children}
        </UserContext.Provider>
    )
}
