import React from "react"
import styled from "styled-components"

const FileViewContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999999;
    background: rgba(0, 0, 0, 0.7);
`

const FileDialog = styled.div`
    width: 85vw;
    max-height: 85vh;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center
`

const CloseBtn = styled.button`
    position: absolute;
    right: 12px;
    top: 12px;
    background-color: transparent;
    border: 0;
    z-index: 999999;
    transition: .2s ease;
    &:focus {
        outline: none
    }
    &:active {
        transform: scale(0.9)
    }
`

export default ({ isOpen, toggle, viewingFile, setViewingFile }) => {
    return isOpen ? <FileViewContainer>
        <FileDialog>
            {viewingFile ? <>
                {viewingFile.type && viewingFile.type.includes("image") && <img src={viewingFile.currentUrl} alt={viewingFile.name} style={{ maxWidth: "85vw", maxHeight: "85vh" }} />}

                {viewingFile.type && viewingFile.type.includes("video") && <video style={{ maxWidth: "85vw", maxHeight: "85vh" }} controls>
                    <source src={viewingFile.currentUrl} type={viewingFile.type} />
                </video>}

                {viewingFile.type && viewingFile.type.includes("audio") && <audio style={{ maxWidth: "85vw", maxHeight: "85vh" }} controls>
                    <source src={viewingFile.currentUrl} type={viewingFile.type} />
                </audio>}
            </> :
                <div className="spinner-border text-primary" role="status" />}

            <CloseBtn onClick={() => {
                toggle()
                setViewingFile(null)
            }}>
                <i class="fas fa-times text-danger" style={{ fontSize: "2rem" }} />
            </CloseBtn>
        </FileDialog>
    </FileViewContainer> : null
}