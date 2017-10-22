(function () {
	const io = window.io;
	const socket = io();

	const appendMessage = msg => {
		const main = document.getElementById('main');
		const messagesBox = document.getElementById('messages');
		const newMsg = document.createElement('li');
		newMsg.textContent = msg;
		messagesBox.appendChild(newMsg);
		main.scrollTop = main.scrollHeight;
	};

	const addNotification = msg => {
		const alertContainer = document.getElementById('alertContainer');
		const alertBox = document.getElementById('alertMsg');
		alertBox.textContent = msg;
		alertContainer.classList.add('show');
		alertContainer.addEventListener('click',
			() => alertContainer.classList.remove('show'), false);
		setTimeout(() => alertContainer.classList.remove('show'), 3000);
	};

	const updateCounter = users => {
		const count = document.getElementById('counter');
		count.textContent = users.length;
	};

	const form = document.getElementById('sendForm');
	form.addEventListener('submit', e => {
		e.preventDefault();
		const {value} = e.target.m;
		if (value === '') {
			return false;
		}

		e.target.m.value = '';
		socket.emit('chatMessage', value);
	});

	socket.on('chatMessage', msg => appendMessage(msg));
	socket.on('connectedUser', ({connectedUsers}) => {
		addNotification('New user connected!');
		updateCounter(connectedUsers);
	});
})();
