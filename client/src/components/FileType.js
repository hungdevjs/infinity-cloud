import React from "react"
import styled from "styled-components"

const FileTypeContainer = styled.div`
    width: 18%;
    height: 8px;
    margin-bottom: 8px;
    background-color: ${props => props.backgroundColor};
    border-radius: 16px;
    cursor: pointer;
    opacity: ${props => props.opacity && props.type !== props.currentType ? 0.5 : 1};
    &:hover {
        opacity: 1
    }
`

export default ({ type, ...rest }) => {
    const shortType = type.includes("/") ? type.split("/")[0] : type

    const backgroundColor = (() => {
        switch(shortType) {
            case "audio":
                return "#74b9ff"
            case "image":
                return "#f53b57"
            case "video":
                return "#f0932b"
            case "text":
                return "#485460"
            case "application":
                return "#9980fa"
            default:
                return "#20bf6b"
        }
    })()

    return <FileTypeContainer backgroundColor={backgroundColor} type={type} {...rest} title={shortType}/>
}