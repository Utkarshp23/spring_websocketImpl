var stompClient=null;

function connect() {
    let socket = new SockJS("/server");
    stompClient= Stomp.over(socket);
    stompClient.connect({},function (frame){
        console.log("Connected--->"+frame);
        setConnected(true);
        stompClient.subscribe("/room/con",function (response){
            console.log("@@@---->sub--->"+response);
            showMessageOutput(JSON.parse(response.body));
        })
    })
}

function setConnected(connected) {
    document.getElementById('connect').disabled = connected;
    document.getElementById('disconnect').disabled = !connected;
    document.getElementById('conversationDiv').style.visibility
        = connected ? 'visible' : 'hidden';
    document.getElementById('response').innerHTML = '';
}

function disconnect() {
    if(stompClient != null) {
        stompClient.disconnect();
    }
    setConnected(false);
    console.log("Disconnected");
}

function showMessageOutput(messageOutput) {
    var response = document.getElementById('response');
    var p = document.createElement('p');
    p.style.wordWrap = 'break-word';
    p.appendChild(document.createTextNode(messageOutput.from + ": "
        + messageOutput.text ));
    response.appendChild(p);
}

function sendMessage() {
    var from = document.getElementById('from').value;
    var text = document.getElementById('text').value;
    stompClient.send("/app/message", {},
        JSON.stringify({'from':from, 'text':text}));
}