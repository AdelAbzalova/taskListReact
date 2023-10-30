import "./App.css";
import { useState } from "react";
import { Button } from "antd";
import Modal from "./components/Modal";
import { useSelector, useDispatch } from "react-redux";
import Main from "./components/Main";
import { deleteTodo, changeChosenTask } from "./store/todoSlice";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const chosenTaskIndex = useSelector((state) => state.todos.chosenTaskIndex);
  const [mode, setMode] = useState();
  const dispatch = useDispatch();
  function deleteItem() {
    if (window.confirm("Вы точно хотите удалить это задание?")) {
      dispatch(deleteTodo(chosenTaskIndex));
      dispatch(changeChosenTask(null));
    }
  }
  function editTask() {
    setIsModalOpen(true);
    setMode("edit");
  }

  function addTask() {
    setIsModalOpen(true);
    setMode("add");
  }

  return (
    <div className="App">
      <header>
        <h1 style={{ margin: "10px" }}>Список заданий</h1>
        <Button
          type="primary"
          onClick={() => addTask()}
          style={{ margin: "10px" }}
        >
          Добавить задание
        </Button>
        <Button onClick={() => editTask()} style={{ margin: "10px" }}>
          Редактировать задание
        </Button>
        <Button danger onClick={() => deleteItem()} style={{ margin: "10px" }}>
          Удалить задание
        </Button>
        {isModalOpen && (
          <Modal setIsModalOpen={setIsModalOpen} mode={mode}></Modal>
        )}
        <Main></Main>
      </header>
    </div>
  );
}

export default App;
