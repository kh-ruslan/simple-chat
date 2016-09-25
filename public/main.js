const socket = io()

$('form').submit(() => {
	let m = $('#m').val()
	$('#messages').append($('<li>' + '<div>' + '<p>' + m + '</p>' + '</div>' + '</li>').addClass('me'))
    socket.emit('chat message', m)
    $('#m').val('')
    $('.chat-container').scrollTop($('#messages').height())
    return false
})

socket.on('chat message', (msg) => {    
   $('#messages').append($('<li>' + '<div>' + '<p>' + msg + '</p>' + '</div>' + '</li>').addClass('received'))
   $('.chat-container').scrollTop($('#messages').height())
})
