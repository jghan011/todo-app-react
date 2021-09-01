import React from "react";
import "./App.css";

function App() {
  const [shoppingCartItems, setShoppingCartItems] = React.useState([]);
  //setTodos will be the setter value. will set values of todos
  const [itemName, setItemName] = React.useState("");

  const [todoEditing, setTodoEditing] = React.useState(null);

  const [editingText, setEditingText] = React.useState("");

  React.useEffect(() => {
    const temp = localStorage.getItem("shoppingItemAccess"); // the quote is not abritrary.. we will use this quote and getItem to access from the other local storage from below see how it has the same name
    const loadedItems = JSON.parse(temp);

    if (loadedItems) {
      setShoppingCartItems(loadedItems);
    }
  }, []); //we leave this empty because we only want to run this once when we load the page

  React.useEffect(() => {
    const jsonTing = JSON.stringify(shoppingCartItems);
    localStorage.setItem("shoppingItemAccess", jsonTing); //the string is for where we can access this data, which can be anything you want to call it. the second value will be the const variable name
  }, [shoppingCartItems]);
  
  function handleSubmit(e) {
    e.preventDefault();

    const newShoppingItem = {
      id: new Date().getTime(),
      text: itemName,
      completed: false,
    };

    setShoppingCartItems([...shoppingCartItems].concat(newShoppingItem));
    setItemName("");
  }

  function deleteShoppingCartItem(idOne) {
    const updatedShoppingCartItems = [...shoppingCartItems].filter(
      (cartItem) => {
        console.log({ cartItem });
        console.log({ idOne }); 
        return cartItem.id !== idOne; 
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
/
export default App;
