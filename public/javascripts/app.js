(function (win, doc) {
	
	var socket = io.connect('http://localhost:3000')
    , joinButton = doc.getElementById('join')
    , msgTextBox = doc.getElementById('msgText')
    , sendButton = doc.getElementById('send')
    , nameTextBox = doc.getElementById('name');

	socket.on('chat', function (data) {
		var grp = doc.getElementById('chat-group');
		grp.insertAdjacentHTML('beforeend', '<p>'+ data.msg +'</p>');
	});
	
  var enableAndDisable = function () {
      msgTextBox.disabled = false;
      sendButton.disabled =  false;
      joinButton.disabled = true;
      nameTextBox.disabled = false;
  };

  joinButton.onclick = function (event) {
    var name = nameTextBox.value

    if(name && name !== "") {
      
      socket.emit('join', {name: name});
      enableAndDisable();

    } else {
      alert("Please enter valid name to join the conversation");
    }
	};

  sendButton.onclick = function (event) {
    var msg = msgTextBox.value;

    if (msg && msg !== "") {
      socket.emit('send', {msg: msg});
      msgTextBox.value = ""  
    }
  };
}).call(this, window, document);