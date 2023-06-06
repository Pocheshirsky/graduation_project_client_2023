import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import store from "@/store"

let stompClient;
let userUuid;
let userInfoUuid;

export function connect(uuid, infoUuid) {
    userUuid = uuid
    userInfoUuid = infoUuid
    let sockjs = new SockJS("http://localhost:8090/ws");
    stompClient = Stomp.over(sockjs);
    stompClient.debug = () => { }
    stompClient.connect({}, onConnected, (err) =>
        console.log("ERROR", err))

}

function onConnected() {
    console.log("Соединение установлено",arguments);

    stompClient.subscribe(`/user/${userUuid}/queue/messages`, onMessageReceived)
    stompClient.subscribe(`/user/${userInfoUuid}/hne`, onMessageReceived2)
}

function onMessageReceived(message) {
    console.log("Полученное сообщение:", JSON.parse(message.body));
    store.state.user.newMessages.push(JSON.parse(message.body))
}

function onMessageReceived2(message) {
    console.log("Полученное сообщение:", JSON.parse(message.body))
    store.state.user.newAlerts.push(...JSON.parse(message.body))
}

export function sendMessage(message) {
    stompClient.send("/app/chat", {}, JSON.stringify(message));
}