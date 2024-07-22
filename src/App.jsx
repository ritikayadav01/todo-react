import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Navbar from "./components/Navbar";
import "./App.css";
import { v4 as uuidv4 } from "uuid";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";

function App() {
  // state to handle todo
  const [todo, setTodo] = useState("");
  // state to handle the array of  todos
  const [todos, setTodos] = useState([]);
  const [showFinished, setshowFinished] = useState(true);
  // this is will load the todos
  useEffect(() => {
    let todoString = JSON.parse(localStorage.getItem("todos"));
    if (todoString) {
      // key is todos
      // this convert it(string) to javascript object
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, []);
  const toggleFinished = () => {
    // to toggle the the check box
    setshowFinished(!showFinished);
  };
  const saveToLocal = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };
  const handleAdd = () => {
    //uuid gives unique id
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    saveToLocal();
  };
  const handleEdit = (e, id) => {
    // this will give the todo in the input box
    let t = todos.filter((item) => item.id === id);
    setTodo(t[0].todo);
    //the current is deleted
    let newTodos = todos.filter((item) => {
      return item.id !== id;
      // newTodos[index].isCompleted=!newTodos[index].isCompleted;
    });
    setTodos(newTodos);
    saveToLocal();
  };

  const handleDelete = (e, id) => {
    let newTodos = todos.filter((item) => {
      return item.id !== id;
      // newTodos[index].isCompleted=!newTodos[index].isCompleted;
    });
    setTodos(newTodos);
    saveToLocal();
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };
  const handleCheckBox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    // new array have to use [...todos] ohterwise the state wont change
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLocal();
  };
  return (
    <>
      <Navbar />
      <div className=" mx-3 :md: container md:mx-auto my-7 rounded-xl bg-cyan-200 p-5 min-h-[75vh] md:w-1/2 ">
        <h1 className="font-bold text-center text-2xl">
          TASK TACKLER- Tackle your Task!!!
        </h1>
        <div className="addtodo my-5 flex flex-col gap-4">
          <h1 className="text-lg font-bold ">Add a Todo</h1>
          <div className="flex ">
            <input
              onChange={handleChange}
              value={todo}
              type="text"
              className="w-full rounded-sm px-2 py-1 my-3"
            />
            <button
              disabled={todo.length <= 3}
              onClick={handleAdd}
              className="bg-sky-700 hover:bg-sky-900 p-3 py-2 text-white rounded-md  mx-2 my-5 disabled:bg-sky-950"
            >
              Save
            </button>
          </div>
        </div>
        <input
          className="my-4"
          onChange={toggleFinished}
          type="checkbox"
          checked={showFinished}
        />
        Show Finished
        <h2 className="text-lg font-bold">Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && <div className="m-5">No Todos to display</div>}
          {todos.map((item) => {
            // return always otherwise doesnt show anything
            return (
              (showFinished || !item.isCompleted) && (
                <div key={item.id} className="todo flex justify-between my-3">
                  <div className="flex gap-5">
                    <input
                      name={item.id}
                      onChange={handleCheckBox}
                      checked={item.isCompleted}
                      type="checkbox"
                      id=""
                    />
                    <div className={!item.isCompleted ? "" : "line-through"}>
                      {item.todo}
                    </div>
                  </div>
                  <div className="buttons flex h-full">
                    <button
                      onClick={(e) => {
                        handleEdit(e, item.id);
                      }}
                      className="bg-sky-700 hover:bg-sky-900 p-2 py-1 text-white rounded-md mx-2 font-bold"
                    >
                      <CiEdit />
                    </button>
                    <button
                      onClick={(e) => {
                        handleDelete(e, item.id);
                      }}
                      className="bg-sky-700 hover:bg-sky-900 p-3 py-1 text-white rounded-md mx-2 font-bold"
                    >
                      <MdDelete />
                    </button>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
