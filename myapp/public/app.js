// run script when script is downloaded

const ul = document.getElementsByClassName('list')[0];
const input = document.querySelector('input');
const API = 'http://localhost:3000/api/todos';

document.addEventListener('DOMContentLoaded', function() {
	addTodos('GET', API);
});

function addTodos(method, url) {
	let XHR = new XMLHttpRequest();
	XHR.onreadystatechange = function() {
		if (XHR.readyState == 4 && XHR.status == 200) {
			let data = JSON.parse(XHR.responseText);
			data.forEach(todo => {
				addTodo(todo);
			});
		}
	};
	XHR.open(method, url);
	XHR.send();
}

function addTodo(todo) {
	let completed = todo.completed ? 'done' : '';
	let newTodo = `<li class="task ${completed}"> ${todo.name}</li>`;
	ul.innerHTML += newTodo;
	console.log(`task: ${todo.name}`);
}

input.addEventListener('keydown', event => {
	if (event.which === 13) {
		createTodo(`{"name"= "${input.value}"}`);
		input.value = '';
	}
});

// send POST request to api/todos
function createTodo(usrInput) {
	// var data = 'name=Buy%20Hippo';
	let newTodo = JSON.stringify(usrInput);
	console.log('bem!', newTodo, typeof newTodo);
	let xhr = new XMLHttpRequest();

	xhr.onreadystatechange = function(newTodo) {
		addTodo(newTodo);
		if (this.readyState === 4) return;
		console.log("===", this.responseText);
		if (this.readyState != 4) return;
		console.log('!', this.responseText);
	};
	xhr.open('POST', API, open);
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xhr.send(usrInput);
}
