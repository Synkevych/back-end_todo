// run script when script is downloaded

const ul = document.getElementsByClassName('list')[0];

document.addEventListener('DOMContentLoaded', function() {
	let XHR = new XMLHttpRequest();
	XHR.onreadystatechange = function() {
		if (XHR.readyState == 4 && XHR.status == 200) {
			let data = JSON.parse(XHR.responseText);
			data.forEach(todo => {
				let completed = todo.completed ? 'done' : '';
				let newTodo = `<li class="task ${completed}"> ${todo.name}</li>`;
				ul.innerHTML += newTodo;
				console.log(`task: ${todo.name}`);
			});
		}
	};
	XHR.open('GET', 'http://localhost:3000/api/todos');
	XHR.send();
});
