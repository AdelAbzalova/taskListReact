import { Checkbox } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { toggleCheckbox } from "../store/todoSlice";

export default function MenuItem(props) {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.todos);
  let taskIndex = props.selectedTask;
  const exercises = todos[props.selectedTask];
  return (
    <div>
      <ul>
        {exercises.exercise !== undefined &&
          exercises.exercise.map((ex, exerciseIndex) => (
            <li
              style={{ listStyle: "none", textAlign: "left" }}
              key={exerciseIndex}
              onClick={() =>
                dispatch(toggleCheckbox([taskIndex, exerciseIndex]))
              }
            >
              <Checkbox
                checked={ex.checked}
                style={{ margin: "10px" }}
              ></Checkbox>

              {ex.name}
            </li>
          ))}
      </ul>
    </div>
  );
}
