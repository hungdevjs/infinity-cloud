import React from "react"
import PerfectScrollbar from "react-perfect-scrollbar"

export default ({ people }) => (
    <div
        className="mb-2 p-2"
        style={{
            height: "70vh",
            border: "1px solid #bbb",
            borderRadius: "4px",
        }}
    >
        <p className="text-center">People in this room</p>
        <div>
            <PerfectScrollbar>
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
            </PerfectScrollbar>
        </div>
    </div>
)
