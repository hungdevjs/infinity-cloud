import { store } from 'react-notifications-component'

export default notiInfo => {
    const { title, message, type } = notiInfo

    store.addNotification({
        title,
        message,
        type,
        insert: "top",
        container: "top-right",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
            duration: 2000,
            showIcon: true
        },
        width: 300
    })
}