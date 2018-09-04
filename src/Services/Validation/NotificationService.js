import { NotificationLevel } from "Services/Constants/NotificationLevel";

let _notificationSystem;

export class NotificationService {

   static set notificationSystem(value) {
        _notificationSystem = value;
    }

    static showError(message, title) {
        _notificationSystem.addNotification({
            title: title,
            message: message,
            level: NotificationLevel.Error,
            autoDismiss: 0,
            position:"tc"
        });
    }


    static showMessage(message, title,level) {
        _notificationSystem.addNotification({
            title: title,
            message: message,
            level: level,
            autoDismiss: 0,
            position: "tc"
        });
    }
}