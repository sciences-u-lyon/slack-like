const serverURL = 'https://slack-like-server.herokuapp.com';

const socket = io.connect(serverURL);

const messagesContainer = document.querySelector('#messages-container');

const messageHTML = message => /* html */`
  <li class="message-container">
    <div class="avatar-container">
      <figure class="image is-48x48">
        <img class="avatar" src="${serverURL}/${message.sender.avatar}">
      </figure>
    </div>
    <div>
      <div>
        <span class="has-text-weight-bold username">${message.sender.nickname}</span><span class="timestamp">${message.timestamp}</span>
      </div>
      <div>
        ${message.content}
      </div>
    </div>
  </li>
`;

socket.on('slack:messages', messages => {
  const htmlMessagesArray = messages.map(message => messageHTML(message));
  messagesContainer.innerHTML = htmlMessagesArray.join('');
});

const newMessageInput = document.querySelector('.new-message');
newMessageInput.addEventListener('keydown', event => {
  if (event.keyCode === 13) {
    event.preventDefault();

    socket.emit('slack:new-message', newMessageInput.value, 'johndoe');
    newMessageInput.value = '';
  }
});

socket.on('slack:new-message', newMessage => {
  messagesContainer.innerHTML += messageHTML(newMessage);
  window.scrollTo(0, document.body.scrollHeight);
});
