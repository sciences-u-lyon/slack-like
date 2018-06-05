# slack-like-client

> Let's build a simple chat web application (client side only)

The goal of this chat web app is to handle Websocket operations with `socket.io` and DOM manipulations.

## Requirements

- node v8+: https://nodejs.org/en/download/current/
- Chrome v61+ / Firefox 54+ (with `dom.moduleScripts.enabled` activated in `about:config`)

## Instructions

You only need to focus on the client side of the app. The server side is up and running on [Heroku](https://www.heroku.com/
 ) cloud platform. Your JavaScript code will be written within `main.js`. The script is already included in `index.html` as an ES2015 module:
```html
<script type="module" src="main.js"></script>
```
**Thus, be sure to use Chrome v61+ or Firefox 54+ (with `dom.moduleScripts.enabled` activated in `about:config`).**

### Install dependencies
```bash
$ yarn / npm install
```

### Run live-server
```bash
$ yarn start / npm start
```

Your default browser should automatically open on http://127.0.0.1:8080/. From now on, every code you write within `main.js` will trigger a live reload, which means you don't need to refresh your page to see the last results.

## Assignments

There are 3 steps that needs to be completed:

1. Fetch and render existing messages on socket connection
2. Emit new message from client to server
3. Handle incomming new messages from server to render them

### Fetch and render existing messages

To fetch existing messages, you should open a socket connection on https://slack-like-server.herokuapp.com/. Once the socket is connected, the server emits the event `slack:messages` to the socket, with the list of existing messages.

A message should be rendered with the following HTML code:

```html
<li class="message-container">
  <div class="avatar-container">
    <figure class="image is-48x48">
      <img class="avatar" src="[avatar]">
    </figure>
  </div>
  <div>
    <div>
      <span class="has-text-weight-bold username">[nickname]</span><span class="timestamp">[timestamp]</span>
    </div>
    <div>[message]</div>
  </div>
</li>
```
Values between `[]` should be replaced with real message data. Each message element is a child of `<ul id="messages-container"></ul>` tag in `index.html`. Each avatar (from the message sender) should be fetched by prefixing https://slack-like-server.herokuapp.com/ to the `sender.avatar` field of the `message` object.

### Emit new message

The input field should be used to emit a new message from the client socket to the server, on the `keydown` event from the `enter` key. You can use the `preventDefault()` function after intercepting this event to avoid the reload of the page.

You should use the socket event `slack:new-message` to emit the new message as the 2nd argument and a nickname of your choice as the 3rd argument of the `emit` function.

Finally, clear the value of the input field, after the message was sent.

### Handle incoming new messages

When new messages from the clients are emitted to the server, the server responds to all connected sockets with the event `slack:new-message` and the new message attached. You should handle this event to display all incoming messages (using the same HTML as above).

If everything works correctly, you shoud notice that you need to manually scroll down to see new messages. To do this automatically, add this code `window.scrollTo(0, document.body.scrollHeight)` right after a new message is rendered.

# Good Luck! 😉
