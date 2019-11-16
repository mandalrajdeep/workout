$(function() {
    var FADE_TIME = 150; // ms
  
    // Initialize variables
    var $window = $(window);
    var $usernameInput = $('.usernameInput'); // Input for username
    var $messages = $('.messages'); // Messages area
    var $inputMessage = $('.inputMessage'); // Input message input box
  
    var $loginPage = $('.login.page'); // The login page
    var $chatPage = $('.chat.page'); // The chatroom page
  
    // Prompt for setting a username
    var username;
    var $currentInput = $usernameInput.focus();
  
    var socket = io();
  
    const addParticipantsMessage = (data) => {
      var message = '';
      if (data.numUsers === 1) {
        message += "there's 1 participant";
      } else {
        message += "there are " + data.numUsers + " participants";
      }
      log(message);
    }
  
    // Sets the client's username
    const setUsername = () => {
      username = cleanInput($usernameInput.val().trim());
  
      // If the username is valid
      if (username) {
        $loginPage.fadeOut();
        $chatPage.show();
        $loginPage.off('click');
        $currentInput = $inputMessage.focus();
  
        // Tell the server your username
        socket.emit('add user', username);
      }
    }
  
    // Log a message
      const log = (message, options) => {
      var $el = $('<li>').addClass('log').text(message);
      addMessageElement($el, options);
    }
  
    // Adds a message element to the messages and scrolls to the bottom
    // el - The element to add as a message
    // options.fade - If the element should fade-in (default = true)
    // options.prepend - If the element should prepend
    //   all other messages (default = false)
    const addMessageElement = (el, options) => {
      var $el = $(el);
  
      // Setup default options
      if (!options) {
        options = {};
      }
      if (typeof options.fade === 'undefined') {
        options.fade = true;
      }
      if (typeof options.prepend === 'undefined') {
        options.prepend = false;
      }
  
      // Apply options
      if (options.fade) {
        $el.hide().fadeIn(FADE_TIME);
      }
      if (options.prepend) {
        $messages.prepend($el);
      } else {
        $messages.append($el);
      }
      $messages[0].scrollTop = $messages[0].scrollHeight;
    }
  
    // Prevents input from having injected markup
    const cleanInput = (input) => {
      return $('<div/>').text(input).html();
    }
  
    // Keyboard events
  
    $window.keydown(event => {
      // Auto-focus the current input when a key is typed
      if (!(event.ctrlKey || event.metaKey || event.altKey)) {
        $currentInput.focus();
      }
      // When the client hits ENTER on their keyboard
      if (event.which === 13) {
        if (username) {
        } else {
          setUsername();
        }
      }
    });
  
    // Click events
  
    // Focus input when clicking anywhere on login page
    $loginPage.click(() => {
      $currentInput.focus();
    });
  
    // Focus input when clicking on the message input's border
    $inputMessage.click(() => {
      $inputMessage.focus();
    });
  
    // Socket events
  
    // Whenever the server emits 'login', log the login message
    socket.on('login', (data) => {
      connected = true;
      // Display the welcome message
      var message = "Hello " + data.username + ", your sensor is " + data.sensor;
      log(message, {
        prepend: true
      });
      addParticipantsMessage(data);
    });

     // Whenever the server emits 'login', log the login message
    socket.on('illegal user', (data) => {
      connected = true;
      // Display the welcome message
      var message = "Sorry " + data.username + ", is not allowed. You'll now be disconnected." ;
      log(message, {
        prepend: true
      });
    });

    socket.on('ongoing workout', (data) => {
      connected = true;
      // Display the welcome message
      var message = "Sorry " + data.username + ", is not allowed in the workout. Can't join now." ;
      log(message, {
        prepend: true
      });
    });
  
    // Whenever the server emits 'user joined', log it in the chat body
    socket.on('user joined', (data) => {
      log(data.username + ' joined with sensor ' + data.sensor );
      addParticipantsMessage(data);
    });
  
    // Whenever the server emits 'user left', log it in the chat body
    socket.on('user left', (data) => {
      log(data.username + ' left');
      addParticipantsMessage(data);
    });

    socket.on('workout', (data) => {
      console.log(data.data)
      log(data.data);
    });
  
    socket.on('disconnect', () => {
      log('you have been disconnected');
    });
  
    socket.on('reconnect', () => {
      log('you have been reconnected');
      if (username) {
        socket.emit('add user', username);
      }
    });
  
    socket.on('reconnect_error', () => {
      log('attempt to reconnect has failed');
    });
  
  });
  