import React from "react"
import styled from "styled-components"

import history from "../configs/history"

const OptionContainer = styled.div`
    width: 100%;
    margin: 0 8px;
    border-radius: 4px;
    cursor: pointer;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.4);
    display: flex;
    align-items: center;
    &:hover {
        transform: scale(0.95);
    }
`

export default ({ option }) => {
    const isChat = option === "Chat"

    const iconCode = isChat ? "fas fa-comment-alt" : "fas fa-gamepad"

    return (
        <OptionContainer
            onClick={() => history.push(`${isChat ? "/chat" : "/game"}`)}
        >
            <div
                className="d-flex align-items-center justify-content-center"
                style={{
                    width: "50px",
                    height: "50px",
                }}
            >
                <i className={`text-danger ${iconCode}`} />
            </div>
            <div
                className="flex-grow-1 d-flex align-items-center justify-content-center font-weight-bold"
                style={{
                    height: "50px",
                    backgroundColor: "#ddd",
                    borderTopRightRadius: "4px",
                    borderBottomRightRadius: "4px",
                }}
            >
                {option}
            </div>
        </OptionContainer>
    )
}
