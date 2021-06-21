import * as React from "react";
import { useLogic } from "../../context/main-context";
import InputData from "./InputData";

export default function Data({ data, type }) {
  const { dispatch } = useLogic();

  return (
    <section className="data">
      <ul>
        {data.map((item, key) => (
          <InputData
            key={key}
            title={item.title}
            value={item.value}
            id={item.id}
            type={type}
          />
        ))}
        <li className="flex">
          <button
            className="data__button reset"
            onClick={() => dispatch({ type: "reset", state: type })}
          >
            reset
          </button>
          <button
            className="data_button rand"
            onClick={() => dispatch({ type: "random", state: type })}
          >
            random
          </button>
        </li>
      </ul>
    </section>
  );
}
