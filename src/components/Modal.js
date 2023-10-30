import { Button, Checkbox } from "antd";
import { PlusOutlined, DeleteOutlined, CloseOutlined } from "@ant-design/icons";
import { useState } from "react";
import React from "react";
import { addTodo, editTodo } from "../store/todoSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Modal(props) {
  const dispatch = useDispatch();
  function closeModal() {
    props.setIsModalOpen(false);
  }
  const chosenTaskIndex = useSelector((state) => state.todos.chosenTaskIndex);
  const todos = useSelector((state) => state.todos.todos);
  let currentTask = "";
  let currentExercises = [];
  let btnStatus = true;
  if (props.mode === "edit") {
    currentTask = todos[chosenTaskIndex].task;
    currentExercises = todos[chosenTaskIndex].exercise;
    btnStatus = false;
  }
  const [exercises, setExercises] = useState(currentExercises);
  const [task, setTask] = useState(currentTask);
  const [chosenExerciseIndex, setChosenExerciseIndex] = useState();
  const [disabledSaveButton, setDisabledSaveButton] = useState(btnStatus);
  function changeExercise(newValue, currentExerciseIndex) {
    setExercises(
      exercises.map((ex, index) => {
        if (index === currentExerciseIndex) {
          return { ...ex, name: newValue };
        } else {
          return ex;
        }
      })
    );
  }
  function changeCheckbox(currentExerciseIndex) {
    setExercises(
      exercises.map((ex, index) => {
        if (index === currentExerciseIndex) {
          return { ...ex, checked: !ex.checked };
        } else {
          return ex;
        }
      })
    );
  }
  function saveChanges() {
    if (props.mode === "add") {
      dispatch(addTodo({ task: task, exercise: exercises }));
    }
    if (props.mode === "edit") {
      dispatch(
        editTodo([chosenTaskIndex, { task: task, exercise: exercises }])
      );
    }

    closeModal();
  }
  function changeTask(e) {
    setTask(e.target.value);
    e.target.value !== ""
      ? setDisabledSaveButton(false)
      : setDisabledSaveButton(true);
  }
  const exercisesList = exercises.map((ex, index) => (
    <tr key={index} onClick={() => setChosenExerciseIndex(index)}>
      <td>
        <Checkbox
          checked={ex.checked}
          onChange={(e) => changeCheckbox(index)}
        ></Checkbox>
      </td>
      <td>
        <input
          type="text"
          value={ex.name}
          onChange={(e) => changeExercise(e.target.value, index)}
        />
      </td>
    </tr>
  ));
  return (
    // <>
    <div className="modal-backdrop" onClick={closeModal}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <header className="modal-header">
          {props.mode === "add"
            ? "Добавление задания"
            : "Редактирование задания"}

          <Button onClick={closeModal}>
            <CloseOutlined />
          </Button>
        </header>
        <div className="modal-body">
          <div>
            <div className="body-header">Задание:</div>
            <textarea
              name=""
              cols="40"
              rows="3"
              className="body-textarea"
              value={task}
              onChange={(e) => changeTask(e)}
            ></textarea>
          </div>
          <div className="body-list">
            <div>Список задач:</div>
            <div>
              <Button
                style={{ margin: "0 10px" }}
                onClick={() =>
                  setExercises([...exercises, { checked: false, name: "" }])
                }
              >
                <PlusOutlined />
              </Button>
              <Button
                danger
                onClick={() =>
                  setExercises(
                    exercises.filter(
                      (ex) => ex !== exercises[chosenExerciseIndex]
                    )
                  )
                }
              >
                <DeleteOutlined />
              </Button>
            </div>
          </div>
          <div className="body-table">
            {exercisesList.length !== 0 && (
              <table>
                <thead>
                  <tr>
                    <th>Статус</th>
                    <th>Название</th>
                  </tr>
                </thead>
                <tbody>{exercisesList}</tbody>
              </table>
            )}
          </div>
        </div>
        <footer className="modal-footer">
          <Button
            onClick={() => saveChanges()}
            disabled={disabledSaveButton}
            style={{ margin: "0 10px" }}
          >
            Сохранить
          </Button>

          <Button danger onClick={closeModal}>
            Закрыть
          </Button>
        </footer>
      </div>
    </div>
  );
}
