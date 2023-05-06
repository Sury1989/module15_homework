//определяем основные переменные
const input = document.querySelector(".input");
const btnSend = document.querySelector(".button-send");
const btnGeo = document.querySelector(".button-geo");
const chat = document.querySelector(".chat");
const clear = document.querySelector(".clear");

// для открытия соединения создаем экземпляр класса WebSocked
const wsUri = "wss://echo-ws-service.herokuapp.com";
let webSocket = new WebSocket(wsUri);

webSocket.onopen = () => {
  console.log("connected");
};

webSocket.onmessage = ({ data }) => {
  innerChat(data, true);
};

webSocket.onerror = () => {
  console.log("error");
};

// вешаем обработчик на кнопку отправки сообщений, проверяем соединение
btnSend.addEventListener("click", () => {
  const message = input.value.trim();
  if (!message || webSocket.readyState !== WebSocket.OPEN) return;
  sendAndLogMessage(message);
  input.value = "";
});

// вешаем обработчик на кнопку гео-локации
btnGeo.addEventListener("click", () => {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const link = `https://www.openstreetmap.org/#map=18/${coords.latitude},${coords.longitude}`;
        writeOutput(
          `<a class="geo-info" href="${link}" target="_blank">Гео-локация</a>`
        );
      },
      ({ message }) => {
        console.error(`Ошибка геолокации: ${message}`);
        writeOutput("Местоположение не определено");
      }
    );
  }
});

// отправляем сообщение на сервер, выводим в чат
function sendAndLogMessage(message) {
  webSocket.send(message);
  innerChat(message, false);
}

function innerChat(message, isReceived) {
  let messageHTML = `<div class="${
    isReceived ? "recieved" : "send"
  }">${message}</div>`;
  chat.insertAdjacentHTML("beforeend", messageHTML);
}

// добавляем новое сообщение в чат
function writeOutput(message) {
  let messageHTML = `<span>${message}</span>`;
  chat.insertAdjacentHTML("beforeend", messageHTML);
}

//очищаем чат
clear.addEventListener("click", () => {
  chat.innerHTML = " ";
});