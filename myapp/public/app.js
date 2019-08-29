// run script when script is downloaded 

document.addEventListener('DOMContentLoaded', function() {
	  let XHR = new XMLHttpRequest();
		XHR.onreadystatechange = function() {
			if (XHR.readyState == 4 && XHR.status == 200) {
				let data = JSON.parse(XHR.responseText);
				console.log("data",data);
			}
		};
		XHR.open('GET', 'http://localhost:3000/api/todos');

		XHR.send();
});