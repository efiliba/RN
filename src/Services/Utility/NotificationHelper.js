import React from "react";
import { RouteUrls } from "Services/Constants/RouteUrls";
export class NotificationHelper {
    static prepareToRender(notification) {
        
        switch (notification.NotificationSource) {
            case 0:
                notification.IconCssClass = "fa-envelope-o";
                notification.Message = "Your <strong>monthly score update</strong> is here";
                notification.ShortMessage = "Monthly Score Update";
                notification.LinkUrl = `${RouteUrls.howYouRank}?toScoreHistory=1`;
                notification.LinkText = "View Score History";
                break;
            case 1:
                notification.IconCssClass = "fa-file-text-o";
                notification.Message = notification.Message;
                notification.ShortMessage = notification.ShortMessage;
                notification.LinkUrl = RouteUrls.creditReportSummary;
                notification.LinkText = "View Credit Report Summary";
                break;
            case 3:
                notification.IconCssClass = "fa-handshake-o";
                notification.Message = "<strong>Joined Credit Savvy</strong>";
                notification.ShortMessage = "Joined Credit Savvy";
                notification.LinkUrl = RouteUrls.welcomeTour;
                notification.LinkText = "View the welcome tour";
                break; 
            case 4:
                notification.IconCssClass = "fa-clock-o";               
                notification.LinkUrl = RouteUrls.creditReportSummary;
                notification.LinkText = "View Credit Report Summary";
                break;  
            case 5:
                notification.IconCssClass = "fa-clock-o";
                notification.LinkUrl = RouteUrls.creditReportSummary;
                notification.LinkText = "View Credit Report Summary";
                break; 
            case 6:
                notification.IconCssClass = "fa-thumbs-up";
                notification.Message = "<strong>You've moved up a score band!</strong>";
                notification.ShortMessage = "You've moved up a score band!";
                notification.LinkUrl = RouteUrls.compare;
                notification.LinkText = "Compare offers today";
                break; 
     }
        
    }

 static  getCssClasses(notification) {
        var cssClass = "notification";

        if (notification.IsNew) {
            cssClass = cssClass + " isNew";
        }

        if (notification.NotificationSource === 3) {
            cssClass = cssClass + " joined";
        }

        return cssClass;
 }

 
   
}