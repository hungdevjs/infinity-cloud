import React from "react"
import { connect } from "react-redux"
import styled from "styled-components"

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

`

const UserIcon = props => {

    return <UserIconContainer>
        <i className="fas fa-user mr-3 mt-3" title={props.user} />
    </UserIconContainer>
}

const mapStateToProps = state => ({
    user: state.user
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(UserIcon)