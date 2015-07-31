		var socket = io();

		$('form').submit(function(e){
			e.preventDefault();
			sendMessage();
		});

		$('#m').keypress(function(e) {
			if (e.which === 13 && formsFilled()) {
				sendMessage();
			}
		})


		socket.on('chat message', function(msg){
			console.log(msg)
			$('#messages').append($('<li>').html(bold(msg.username) + ": " + msg.message));
		})

		socket.on('user_count', function(user_count){
			console.log(user_count)
			$('.u-count').text(user_count)
		})

		function bold(text) {
			return '<b>' + text + '</b>'
		}

		function sendMessage() {
				socket.emit('chat message', { 
		  	username: $('#u').val(), 
		  	message: $('#m').val()
		  });
		  $('#m').val('');
		  return false;
		}

		function formsFilled() {
			if ($('#u').val().length > 0 && $('#m').val().length > 0) {
				return true
			} else { return false }
		}