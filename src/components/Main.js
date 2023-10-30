import React from "react";
import { Menu } from "antd";
import { useSelector, useDispatch } from "react-redux";
import MenuItem from "./MenuItem";
import { changeChosenTask } from "../store/todoSlice";

export default function Main() {
  const todos = useSelector((state) => state.todos.todos);
  const todo = todos.map((todo, index) => getItem(todo.task, index));
  const selectedTask = useSelector((state) => state.todos.chosenTaskIndex);
  const dispatch = useDispatch();
  function getItem(label, key, children, type) {
    return {
      key,
      children,
      label,
      type,
    };
  }

  const items = [
    getItem("Задачи", "grp", [...todo], "group"),
  ];
  return (
    <div style={{ width: "100%", display: "flex" }}>
      <Menu
        onClick={(e)=>dispatch(changeChosenTask(e.key))}
        style={{
          width: 256,
        }}
        items={items}
      />
      {selectedTask !== null && (
        <MenuItem selectedTask={selectedTask}></MenuItem>
      )}
    </div>
  );
}
