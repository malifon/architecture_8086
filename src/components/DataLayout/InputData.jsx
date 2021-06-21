import React from "react";
import { useLogic } from "../../context/main-context";

export default function InputData({ value, title, id, type }) {
  const { dispatch } = useLogic();

  return (
    <li className="data__item">
      <p className="item__title">{title}</p>
      <input
        value={value}
        onChange={(e) =>
          dispatch({
            type: "change",
            state: { id, value: e.target.value, type },
          })
        }
        className="item__text"
        maxLength={4}
      />
    </li>
  );
}
