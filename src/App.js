import React from "react";
import "./App.css";

function App() {
  const [shoppingCartItems, setShoppingCartItems] = React.useState([]);
  //setTodos will be the setter value. will set values of todos
  const [itemName, setItemName] = React.useState("");

  const [todoEditing, setTodoEditing] = React.useState(null);

  const [editingText, setEditingText] = React.useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const newShoppingItem = {
      id: new Date().getTime(),
      text: itemName,
      completed: false,
    };

    setShoppingCartItems([...shoppingCartItems].concat(newShoppingItem));
    // console.log({newShoppingItem}, 'was added')
    setItemName("");
  }

  function deleteShoppingCartItem(idOne) {
    const updatedShoppingCartItems = [...shoppingCartItems].filter(
      (cartItem) => {
        //console.log({ cartItem });
        console.log({ cartItem });
        console.log({ idOne }); // is basically based of todo.id on  the moment of the click of delete button so since it is todo.id the id means we are looking for time and date at the moment
        return cartItem.id !== idOne; // 12345 !== 12345 false they'll always be equal
        // In this situation the cartitem.id looks for {pulls up shopping cart items object and looks for id which is :new Date().getTime()}
      }
    );
    setShoppingCartItems(updatedShoppingCartItems);
    console.log(idOne);
  }
  function submitTodo(idTwo) {
    const updatedItemsOnSubmit = [...shoppingCartItems].map((cartItem) => {
      if (cartItem.id === idTwo) {
        cartItem.text = editingText;
      }
      return cartItem;
    });
    setShoppingCartItems(updatedItemsOnSubmit);
    setTodoEditing(null);
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setItemName(e.target.value)}
          value={itemName}
        />

        <button type="submit">Add todo</button>
      </form>

      {shoppingCartItems.map((todo) => (
        /* todo will look for items inside of const newShoppingItem = {
      id: new Date().getTime(),
      text: itemName,
      completed: false,
    };*/
        <div key={todo.id}>
          {todoEditing === todo.id ? (
            <input
              type="text"
              onChange={(e) => setEditingText(e.target.value)}
              value={editingText}
            />
          ) : (
            <div>{todo.text}</div>
          )}
          <button onClick={() => deleteShoppingCartItem(todo.id)}>
            delete
          </button>

          <button onClick={() => setTodoEditing(todo.id)}>Edit Todo</button>
          <button onClick={() => submitTodo(todo.id)}>Submit</button>
        </div>
      ))}
    </div>
  );
}
// in the turnary it's saying if its the todo we're editing show an input if not show the text
//to get edit working we add new hooks
//we did the key in the div so that we wouldn't get that caution in the console about having a unique key
//filter works is if you return a true boolean or true value it will return and if you return a false it won't return
// I was wondering how the delete button is working outside of the form but it's because we have todos targeted orignally and then todo.id  which will create a deletable button
export default App;
