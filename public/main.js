Date.prototype.today = function () { 
    return ((this.getHours() < 10)?"0":"") 
      + this.getHours() + ":" 
      + ((this.getMinutes() < 10)?"0":"") 
      + this.getMinutes()
}

const socket = io()
let user_name = ''


$('#name').submit(() => {
    user_name = $('#name-input').val()
    if (user_name !== '') {
        socket.emit('online', user_name)
        $('.modal').css('display', 'none')
        return false
    }
    return false
})

$('#text').submit(() => {
    let text = $('#m').val()
    let time = new Date()    
    let local_time = time.today()

    if (text !== '') {
        $('#messages').append($('<li>' + '<div>' + '<p>' + text + '<span>' + local_time + '</span>' + '</p>' + '</div>' + '</li>').addClass('me'))
        socket.emit('chat', { text: text, name: user_name, time: local_time })
        $('#m').val('')
        $('.chat-area').scrollTop($('#messages').height())
        return false
    }
    return false
})

socket.on('chat', (data) => {
    $('#messages').append($('<li>' + '<div>' + '<p>' + data.name + '</p>' + '<p>' + data.text + '<span>' + data.time + '</span>' + '</p>' + '</div>' + '</li>').addClass('received'))
    $('.chat-area').scrollTop($('#messages').height())
})

socket.on('online', (data) => {
    $('#online').text('')
    let online_list = data.map((e) => {
        return '<li>' + e + '</li>'
    })
    $('#online').append(online_list)
})

$('#bg-select').on('change', function() {
  $('.chat-container').css('background-image', 'url(' + this.value + ')')
});