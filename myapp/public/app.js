// run script when script is downloaded

const ul = document.getElementsByClassName('list')[0];
const input = document.querySelector('input');
const API = 'http://localhost:3000/api/todos';
const span = document.querySelector('span');

document.addEventListener('DOMContentLoaded', function() {
	addTodos('GET', API);
});

function addTodos(method, url) {
	const XHR = new XMLHttpRequest();
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
	let newTodo = `<li data-id=${todo._id} class="task ${completed}"> ${todo.name}<span>x</span></li>`;
	ul.innerHTML += newTodo;
}

input.addEventListener('keydown', event => {
	if (event.which === 13) {
		createTodo(input.value);
		input.value = '';
	}
});

$('.list').on('click', 'li', function() {
	updateTodo($(this));
});

$('.list').on('click', 'span', function(e) {
	e.stopPropagation();
	removeTodo($(this).parent());
});

// send POST request to api/todos
function createTodo(usrInput) {
	{
		// $.post(API, { name: usrInput })
		// 	.then(function(newTodo) {
		// 		addTodo(newTodo);
		// 		input.value = '';
		// 		console.log(newTodo);
		// 	})
		// 	.catch(function(err) {
		// 		console.log(err);
		// });
	}
	const xhr = new XMLHttpRequest();

	xhr.onreadystatechange = () => {
		if (xhr.readyState == 4) {
			let newTodo = JSON.parse(xhr.responseText);
			addTodo(newTodo);
		}
		if (xhr.readyState != 4) {
			console.log(xhr.response);
		}
	};
	xhr.open('POST', API, open);
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xhr.send('name=' + encodeURIComponent(usrInput));
}

function removeTodo(todo) {
	const li = todo.data();
	console.log('todo', todo);
	const deletId = '/api/todos/' + li.id;
	$.ajax({
		method: 'DELETE',
		url: deletId
	})
		.then(function() {
			todo.remove();
		})
		.catch(function(err) {
			console.log('error: ', err);
		});
}

function updateTodo(todo) {
	let isDone = !todo.hasClass('done');
	let updateData = { completed: isDone };
	let updateUrl = '/api/todos/' + todo.data().id;
	console.log(updateUrl);
	$.ajax({
		method: 'PUT',
		url: updateUrl,
		data: updateData
	}).then(() => {
		todo.toggleClass('done');
	});
}
