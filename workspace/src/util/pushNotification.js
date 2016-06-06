import reactNotification from 'react-native-system-notification';

export default function pushNotification({message, type}){
    let {message, type} = notificationData;
    //@TODO 필터링
    reactNotification.create({
        message
    });
}
