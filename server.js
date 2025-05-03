const http = require('http');
const fs = require('fs');
const path = require('path');

const pathToIndex = path.join(__dirname, 'static', 'index.html');
const indexHtmlFile = fs.readFileSync(pathToIndex);

const pathToJS= path.join(__dirname, 'static', 'script.js');
const JSFile = fs.readFileSync(pathToJS);


const pathToCSS= path.join(__dirname, 'static', 'style.css');
const CSSFile = fs.readFileSync(pathToCSS);

const server = http.createServer((req, res)=>{
    switch(req.url){
        case "/":
            return res.end(indexHtmlFile); 
        case "/script.js":
            return res.end(JSFile); 
        case "/style.css":
            return res.end(CSSFile);
        case "/add":
            addMessage(res, req);
            break;
        default:
            res.statusCode = 404;
            return res.end('Error 404');
    }
});
server.listen(3000);
function addMessage(res, req){
    let data = ""
    req.on('data', function(chunk){
        data += chunk;
    })
    req.on('end',function(){
        console.log(data);
    })    
    res.writeHead(302, {Location: '/'});
    res.end();
}
document.addEventListener("DOMContentLoaded", () => {
    const messageList = document.getElementById("messages");
    const counter = document.getElementById("counter");
  
    function updateCounter() {
      const count = messageList.children.length;
      counter.textContent = `Messages: ${count}`;
    }
  
    updateCounter();
  });







// 🧠 Задание 3: Добавь счётчик сообщени
// Что нужно сделать:
// В файле сервера (server.js) добавь переменную, которая будет считать количество отправленных сообщений.

// Каждый раз при получении нового сообщения увеличивай счётчик на 1.

// Передавай значение счётчика на главную страницу и отображай его в тег messages count.

// Результат: На главной странице отображается количество отправленных сообщений.