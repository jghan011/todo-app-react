import logo from './logo.svg';
import React from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = React.useState([])
  //setTodos will be the setter value. will set values of todos 
  const [todo, setTodo] = React.useState("")
  //we use the arrow function on onChange down below to pass the text that we set
  // e is a form event so any time we use a form or a button the browser js gives you access to this e value and  this where you take text from the input. to access that we take in e.target.value
  // E is an event object and target is the input we created  and value is thew value of the input
  //wwe will add third property onto the input which is value and we set it equal to todo
  //this onChange is set todo hook variable. 
  //we set value to todo that way if we set todo that way if we set todo outside of the input it will reflect whatever we're saying
  //when we go to dev tools and click components we see as we type the state is being updated
  //forms generally refresh pages on submission and we don't want that so we do prevent default
  // ... also known as spread operator will clone the todo variable
  //the concat will add our new object into our todo  array
  //after we add a new todo we reset input and make it blacnk so in handleSubmit we write setTodo('')
  //Map a js method that'll go through each element of an array and it will return some value... in this case we wan return the html or jsx for our todo. map needs arrrow funciton
  // if you look in handleSubmit its using setTodos which will update the state of todos with whatever you put inside of setTodo
  //now if you look in {todos.map((todo) => <div>{todo.text}</div>)} we could have set it to {todos.map((todo) => <div>{todo.id}</div>)} and it would display the time, but since we have todo aldso in the form input after   {todos.map((todo) => <div>{todo.text}</div>)} you must type it in the box and submit unlike time which automatically appears



  function handleSubmit(e) {
    e.preventDefault()

    const newTodo = {
      id: new Date().getTime(),
      text: todo,
      completed: false,
    }

    setTodos([...todo].concat(newTodo))
    setTodo('')
  }

  function deleteTodo(id) {
    const updatedTodos = [...todos].filter((todo) => todo.id !== id)

    setTodos(updatedTodos)
  }


  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={(e) => setTodo(e.target.value)} value={todo} />
        <button type="submit">
          Add todo
        </button>

      </form>
      {todos.map((todo) => < div key={todo.id}><div>{todo.text}</div>
        <button onClick={() => deleteTodo(todo.id)}>Delete</button>
      </div>
      )}

    </div>
  );
}
//we did the key in the div so that we wouldn't get that caution in the console about having a unique key
//filter works is if you return a true boolean or true value it will return and if you return a false it won't return
// I was wondering how the delete button is working outside of the form but it's because we have todos targeted orignally and then todo.id  which will create a deletable button
export default App;
