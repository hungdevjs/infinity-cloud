import React, { useState } from 'react'
import { Form, FormGroup, InputGroup, InputGroupAddon, InputGroupText, Input, Button } from 'reactstrap';

const iconStyle = {
    width: '40px'
}

export default () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const onSubmit = e => {
        e.preventDefault()

        // send email and password to server 
    }

    return <>
        <Form onSubmit={e => onSubmit(e)}>
            <FormGroup>
                <h4>Infinity Cloud</h4>
                <InputGroup>
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText style={iconStyle}>
                            <i className="fas fa-user" />
                        </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                </InputGroup>
            </FormGroup>
            <FormGroup>
                <InputGroup>
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText style={iconStyle}>
                            <i className="fas fa-key" />
                        </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
                </InputGroup>
            </FormGroup>
            <FormGroup>
                <Button className="w-100" type="submit" color="primary" size="sm">Log in</Button>
            </FormGroup>
        </Form>
    </>
}