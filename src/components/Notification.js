const Notification = ({ message }) => {
    if (message === null) {
        return null;
    }

    const { type } = message;
    const notificationClass = type === 'success' ? 'notification' : 'error';

    return <div className={notificationClass}>{message.message}</div>;
};

export default Notification