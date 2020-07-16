import { useEffect } from 'react'
import history from '../configs/history'

export default ({ user, route }) => {
    useEffect(() => {
        if (!user && route.isLogged) history.push('/login')
    }, [])

    return route.component()
}