import React, { useState } from "react"

export default ({ people }) => {
    const [isPhone, setIsPhone] = useState(window.innerWidth < 768)

    window.addEventListener("resize", () => setIsPhone(window.innerWidth < 768))

    return (
        <div
            className="mb-2 p-2"
            style={{
                height: isPhone ? "" : "70vh",
                border: "1px solid #bbb",
                borderRadius: "4px",
                overflowY: "scroll",
            }}
        >
            <p className="text-center">People in this room</p>
            <div>
                {people.map((item) => (
                    <div
                        key={item.id}
                        className="d-flex align-items-center mb-2"
                    >
                        <div
                            className="mr-2"
                            style={{
                                width: "8px",
                                height: "8px",
                                borderRadius: "50%",
                                backgroundColor: "green",
                            }}
                        />
                        <p className="mb-0">{item.username}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
