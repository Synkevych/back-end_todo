# JSON APIs With Node & Express & Mongo

## Run app use command

node app.js

## The routes: 
- *GET*		/api/todos			List all todos
- *POST*	/api/todos			Create new todo
- *GET*		/api/todo/:todoId	Retrieve a todo
- *PUT*		/api/todo/:todoId 	Update a todo
- *DELETE*	/api/todo/:todoId	Delete a todo

## Create snippet to run mongod 
add to .bash_profile 
export PATH="/Users/sunkevu4/mongodb/bin:${PATH}"

## What res.send has
res.send = res.json == json code 