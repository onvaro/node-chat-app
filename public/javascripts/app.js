(function (win, doc) {
	
	var socket = io.connect(win.location.protocol + '//' + win.location.host)
    , joinButton = doc.getElementById('join')
    , msgTextBox = doc.getElementById('msgText')
    , sendButton = doc.getElementById('send')
    , nameTextBox = doc.getElementById('name');

	socket.on('chat', function (data) {
		var grp = doc.getElementById('chat-group');
		grp.insertAdjacentHTML('beforeend', '<p>' + data.msg + '</p>');
	});

  socket.on('startsession', function (data) {
    var grp = doc.getElementById('user-group');
    grp.insertAdjacentHTML('beforeend', '<li id="'+ data.name +'">' + data.name + '</li>');
  });

  socket.on('endsession', function (user) {
    var usr = doc.getElementById(user);
    usr.innerHTML = null;
    delete usr;
  });

  socket.on('newsession', function (users) {
    if(users) {
      var grp = doc.getElementById('user-group');
      grp.innerHTML = '';
      for (i in users ) {
        grp.insertAdjacentHTML('beforeend', '<li>' + users[i].name + '</li>')
      }
    }
  });
	
  var enableAndDisable = function () {
      msgTextBox.disabled = false;
      sendButton.disabled =  false;
      joinButton.disabled = true;
      nameTextBox.disabled = true;
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