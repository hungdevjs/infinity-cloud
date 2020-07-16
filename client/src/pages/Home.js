import React from 'react'
import history from '../configs/history'

export default () => <>
    Home
    <button onClick={() => history.push('/login')}>Login</button>
</>