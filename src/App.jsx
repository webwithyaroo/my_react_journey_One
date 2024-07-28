import "./index.css";
import checkedIcon from "./assets/checked.svg";
import unchecked from "./assets/checkbox.png";
import { useState } from "react";

const InitialTodoList = [
  {
    id: 3,
    text: "Get gift for grandma",
    timestamp: new Date().toLocaleTimeString(),
  },
  {
    id: 4,
    text: "Doctors appointment",
    timestamp: new Date().toLocaleTimeString(),
  },
];

export default function App() {
  const [task, setTask] = useState(InitialTodoList);
  const [checked, setChecked] = useState([]);

  function handleTask(list) {
    setTask((task) => [...task, list]);
  }

  function handleChecked(list) {
    setChecked((checked) =>
      checked.includes(list)
        ? checked.filter((t) => t !== list)
        : [...checked, list]
    );

    // setTask((prevTask) => prevTask.filter((t) => t !== list));
  }

  return (
    <div className="App">
      <InputItem onAddTask={handleTask} />
      <TodoLists task={task} checked={checked} onChecked={handleChecked} />
      <Completed checked={checked} />
    </div>
  );
}

function InputItem({ onAddTask }) {
  const [text, setText] = useState("");

  function handleOnSubmit(e) {
    e.preventDefault();

    if (!text) return;

    const id = crypto.randomUUID();
    const newText = { text, id, timestamp: new Date().toLocaleTimeString() };

    setText("");
    onAddTask(newText);
  }

  return (
    <form onSubmit={handleOnSubmit}>
      <input
        type="text"
        placeholder="Today's Tasks"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button className="addBtn">+</button>
    </form>
  );
}

function TodoLists({ task, onChecked, checked }) {
  return (
    <>
      <hr />
      <h1 className="title">To Do</h1>
      <ul className="listContainer">
        {task.map((list) => (
          <ListItem
            list={list}
            checked={checked.includes(list)}
            onChecked={() => onChecked(list)}
            key={list.id}
          />
        ))}
      </ul>
    </>
  );
}

function ListItem({ list, onChecked, checked }) {
  return (
    <li className="listItem">
      <div style={{ display: "flex" }} className="headLine">
        <img
          src={checked ? checkedIcon : unchecked}
          className="checkedIcon"
          onClick={onChecked}
        />
        <p className={checked ? "underlined" : ""}>{list.text}</p>
      </div>
      <div className="Small">
        <small>{list.timestamp}</small>
      </div>
    </li>
  );
}

function Completed({ checked }) {
  return (
    <div>
      <h1 className="title">Completed</h1>
      <ul className="listContainer">
        {checked.map((t) => (
          <li className="listItem" key={t.id}>
            <div className="headLine">
              <img src={checkedIcon} className="checkedIcon" />
              {t.text}
            </div>
            <div className="Small">
              <small>{t.timestamp}</small>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
