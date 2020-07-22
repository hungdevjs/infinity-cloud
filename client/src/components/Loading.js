import React from "react"
import { connect } from "react-redux"

import styled from "styled-components"

const LoadingContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 100vw;
    min-height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    background: rgba(0, 0, 0, 0.5);
`

function Loading(props) {
    return (
        <div>
            {props.loading ? (
                <LoadingContainer>
                    <div className="spinner-border text-primary" role="status" />
                </LoadingContainer>
            ) : null}
        </div>
    )
}

const mapStateToProps = (state) => ({
    loading: state.isLoading,
})

export default connect(mapStateToProps, null)(Loading)
