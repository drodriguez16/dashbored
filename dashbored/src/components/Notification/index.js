
const Notification = (props) => {
    const { token, serId } = props;

    return {
        "mode": "cors",
        "method": "POST",
        "headers": {
            "authorization": `key=${serId}`,
            "content-type": "application/json"
        },
        "body": {
            "collapse_key": "type_a",
            "notification": {
                "body": "Body of Your Notification",
                "title": "Title of Your Notification",
                "icon": "http://www.liberaldictionary.com/wp-content/uploads/2019/02/icon-0326.jpg"
            },
            "data": {
                "body": "Body of Your Notification in Data",
                "title": "Title of Your Notification in Title",
                "key_1": "Value for key_1",
                "key_2": "Value for key_2"
            },
            "to": `${token}`
        }
    }

}
export default Notification;