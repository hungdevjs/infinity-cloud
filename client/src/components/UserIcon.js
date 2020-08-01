import React, { useState } from "react"
import { connect } from "react-redux"
import styled from "styled-components"

import history from "../configs/history"
import { userLogout } from "../redux/action"

const UserIconContainer = styled.span`
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
    z-index: 1000000;
    transition: 0.2s ease;
    &:hover {
        color: #888
    }
`
const UserOption = styled.div`
    position: fixed;
    top: 40px;
    right: 16px;
    padding: 16px;
    border: 1px solid #ccc;
    z-index: 9999999;
    display: ${props => props.show ? "block" : "none"}
`

const LogoutBtn = styled.span`
    margin-bottom: 0;
    color: #007bff;
    cursor: pointer;
    &:hover {
        color: #0069d9
    }
`

const UserIcon = props => {
    const [show, setShow] = useState(false)

    const logout = async () => {
        await props.userLogout()
        history.push("/login")
    }

    return <>
        <UserIconContainer>
            <i className="fas fa-user mr-3 mt-3" title={props.user} onClick={() => setShow(!show)} />
        </UserIconContainer>
        <UserOption show={show}>
            <p>{props.user}</p>
            <hr />
            <LogoutBtn onClick={logout}>Log out</LogoutBtn>
        </UserOption>
    </>
}

const mapStateToProps = state => ({
    user: state.user
})

const mapDispatchToProps = {
    userLogout
}

export default connect(mapStateToProps, mapDispatchToProps)(UserIcon)