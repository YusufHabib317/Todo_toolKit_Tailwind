import {
  addTodo,
  setTodo,
  sort,
  sortTodo,
  todo,
  toggleComplete,
  updateTodo,
} from "../../store/TodoSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { HiOutlineTrash } from "react-icons/hi";
import { SlPencil } from "react-icons/sl";
import pic from "../../assets/todo.jpg";

const TodoList = () => {
  const dispatch = useDispatch();
  const todoList = useSelector(todo);
  const sortTODO = useSelector(sort);
  const [showModal, setShowModal] = useState(false);

  const [currentTodo, setCurrentTodo] = useState(null);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    if (todoList.length > 0) {
      localStorage.setItem("todo", JSON.stringify(todoList));
    }
  }, [todoList]);

  useEffect(() => {
    const localTodo = JSON.parse(localStorage.getItem("todo"));
    if (localTodo) {
      dispatch(setTodo(localTodo));
    }
  }, [dispatch]);

  const handleAddTodo = (task) => {
    if (task.trim().length === 0) {
      alert("Please Enter a Task");
    } else {
      dispatch(
        addTodo({
          task: task,
          id: Date.now(),
        })
      );
      setNewTask("");
      setShowModal(false);
    }
  };
  const handleUpdateTodo = (id, task) => {
    if (task.trim().length === 0) {
      alert("Please Enter a Task");
    } else {
      dispatch(
        updateTodo({
          task: task,
          id: id,
        })
      );
      setShowModal(false);
    }
  };
  const handleDelete = (id) => {
    const newTodoList = todoList.filter((todo) => {
      return todo.id !== id;
    });
    dispatch(setTodo(newTodoList));
    localStorage.setItem("todo", JSON.stringify(newTodoList));
  };

  const handleSort = (sortTODO) => {
    dispatch(sortTodo(sortTODO));
  };
  const sortTodoList = todoList.filter((todo) => {
    if (sortTODO === "All") return true;
    if (sortTODO === "Completed" && todo.completed) return true;
    if (sortTODO === "Not Completed" && !todo.completed) return true;
    return false;
  });
  const handleToggleCompleted = (id) => {
    dispatch(toggleComplete({ id }));
  };
  return (
    <div>
      {showModal && (
        <div className="fixed left-0 top-0 flex items-center justify-center h-full w-full bg-transparentBlack">
          <div className="bg-white p-8 rounded-sm">
            <input
              type="text"
              placeholder={currentTodo ? "Update Your Task" : "Enter New Task"}
              className="border p-2 outline-none rounded-md w-[100%]"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
            <div className="flex items-center justify-between mt-5">
              {currentTodo ? (
                <>
                  <button
                    className="bg-gray-300 py-2 px-4 rounded-md"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="text-white bg-blue_two py-2 px-4 rounded-md"
                    onClick={() => {
                      setShowModal(false);
                      handleUpdateTodo(currentTodo.id, newTask);
                    }}
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="bg-gray-300 py-2 px-4 rounded-md"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="text-white bg-blue_two py-2 px-4 rounded-md"
                    onClick={() => {
                      setShowModal(false);
                      handleAddTodo(newTask);
                    }}
                  >
                    Add
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
      <div className="flex justify-center items-center flex-col">
        {todoList.length === 0 ? (
          <>
            <div>
              <div className="mt-5 sm:w-[500px] min-w-[250px]">
                <img
                  src={pic}
                  alt="img"
                  className="w-[100%] h-[100%] object-cover"
                />
              </div>
              <p className="bg-blue_two text-white w-fit rounded-lg mt-4 mx-auto p-3 text-[0.9rem] text-center">
                You Dont Have Todo's
              </p>
            </div>
          </>
        ) : (
          <>
            <div className="container mx-auto mt-6">
              <div className="flex justify-center mb-6">
                <select
                  onChange={(e) => handleSort(e.target.value)}
                  className="p-1 outline-none text-sm"
                >
                  <option value="All" className="text-sm">
                    All
                  </option>
                  <option value="Completed" className="text-sm">
                    Completed
                  </option>
                  <option value="Not Completed" className="text-sm">
                    Not Completed
                  </option>
                </select>
              </div>
              <div>
                {sortTodoList.map((todo) => {
                  return (
                    <div
                      key={todo.id}
                      className="flex items-center justify-between mb-5 mx-auto w-full md:[75%] rounded-md p-4 bg-slate-100 "
                    >
                      <div
                        className={`${
                          todo.completed
                            ? "line-through text-green_ w-full text-2xl"
                            : "text-blue_one w-full text-2xl"
                        }`}
                        onClick={() => handleToggleCompleted(todo.id)}
                      >
                        {todo.task}
                      </div>
                      <div className="flex items-center justify-center gap-3">
                        <button
                          className="  rounded-sm text-[1.25rem]"
                          onClick={() => {
                            setShowModal(true);
                            setCurrentTodo(todo);
                            setNewTask(todo.task);
                          }}
                        >
                          <SlPencil />
                        </button>
                        <button
                          onClick={() => {
                            handleDelete(todo.id);
                          }}
                        >
                          <HiOutlineTrash className=" text-red-400 rounded-sm text-[1.25rem] " />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}
        <button
          className="bg-blue_one text-white py-2 px-4 rounded-md mt-4"
          onClick={() => setShowModal(true)}
        >
          Add Task
        </button>
      </div>
    </div>
  );
};

export default TodoList;
