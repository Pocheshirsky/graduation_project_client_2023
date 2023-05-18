//import api from '@/plugins/Api'
/* eslint-disable */
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
let stompClient;
let userUuid;


export function connect(uuid) {
    userUuid = uuid
    let sockjs = new SockJS("http://localhost:8090/ws");
    stompClient = Stomp.over(sockjs);
    stompClient.debug = () => { }
    stompClient.connect({}, onConnected, (err) =>
        console.log("ERROR", err))

}

// function connect() {
//     const Stomp = require("@stomp/stompjs");
//     let SockJS = require("sockjs-client");
//     SockJS = new SockJS("http://localhost:8090/ws");
//     stompClient = Stomp.Stomp.over(SockJS);
//     stompClient.connect({}, onConnected, (err) =>
//         console.log("ERROR", err)
//     );
// }
function onConnected() {
    console.log("Соединение установлено",arguments);

    stompClient.subscribe(`/user/${userUuid}/queue/messages`, onMessageReceived)
    stompClient.subscribe("/user/hne", onMessageReceived)
}
function onMessageReceived(message) {
    console.log("Полученное сообщение:", JSON.parse(message.body));

}
function findUserChats() {

}
export function sendMessage(message) {
    // console.log("arararara", message);
    stompClient.send("/app/chat", {}, JSON.stringify(message));
}
// const message = {
//     senderUuid: this.user.uuid,
//     recipientUuid: this.pers,
//     senderName: "admin",
//     recipientName: "admineee",
//     content: this.text,
//     timestamp: new Date(),
// };