import * as React from "react";
import { useLogic } from "../../context/main-context";

export default function MemoryIndex() {
  let { state, dispatch } = useLogic();
  let [route, setRoute] = React.useState("1");
  let [indexVal, setIndex] = React.useState("1");
  let [memory, setMemory] = React.useState("1");

  function getIndex() {
    let reg;
    if (indexVal > 4) {
      let first, second;

      switch (indexVal) {
        case "5":
          first = parseInt(state.index_memory[0].value, 16);
          second = parseInt(state.index_memory[2].value, 16);
          break;
        case "6":
          first = parseInt(state.index_memory[0].value, 16);
          second = parseInt(state.index_memory[3].value, 16);
          break;
        case "7":
          first = parseInt(state.index_memory[1].value, 16);
          second = parseInt(state.index_memory[2].value, 16);
          break;
        case "8":
          first = parseInt(state.index_memory[1].value, 16);
          second = parseInt(state.index_memory[3].value, 16);
          break;
        default:
          throw new Error("This indexVal not exists");
      }

      reg = first + second;
    } else {
      reg = parseInt(state.index_memory[--indexVal].value, 16);
    }
    return reg;
  }

  function calcValue() {
    const disp = parseInt(state.index_memory[4].value, 16);
    let reg = getIndex();

    let result = disp + reg;

    const indexFirst = result.toString(16);

    if (route === "1") {
      ++result;
      const indexSecond = result.toString(16);

      dispatch({
        type: "reg_to_mem",
        state: {
          index: [indexFirst, indexSecond],
          value: state.data_memory[--memory].value,
        },
      });
    }

    if (route === "2") {
      dispatch({
        type: "mem_to_reg",
        state: {
          index: --memory,
          index_register: indexFirst,
        },
      });
    }
  }

  function xchg() {
    const disp = parseInt(state.index_memory[4].value, 16);
    let reg = getIndex();
    let result = disp + reg;

    const indexFirst = result.toString(16);

    dispatch({
      type: "reg_mem_xchg",
      state: {
        value: state.data_memory[--memory].value,
        index_register: indexFirst,
        index: memory,
      },
    });
  }

  function pop(index) {
    if (index === undefined) return;

    dispatch({
      type: "pop",
      state: {
        index,
      },
    });
  }

  function push(index) {
    if (index === undefined) return;
    const disp = parseInt(state.index_memory[3].value, 16);

    let result = disp + 2;

    const sp_value = result.toString(16);

    function addZero(value) {
      if (value.length < 4) {
        value = "0" + value;
        return addZero(value);
      }
      return value;
    }

    dispatch({
      type: "push",
      state: {
        value: addZero(sp_value),
        index,
      },
    });
  }

  return (
    <div className="index">
      <div className="index__route">
        <p>1.</p>
        <select onBlur={(event) => setRoute(event.target.value)} defaultValue={route}>
          <option value="1">z reg do mem</option>
          <option value="2">z mem do reg</option>
        </select>
      </div>
      <div className="index__indexes">
        <p>2.</p>

        <select
          onBlur={(event) => setIndex(event.target.value)}
          defaultValue={indexVal}
        >
          <option value="1">SI</option>
          <option value="2">DI</option>
          <option value="3">BX</option>
          <option value="4">BP</option>
          <option value="5">SI i BX</option>
          <option value="6">SI i BP</option>
          <option value="7">DI i BX</option>
          <option value="8">DI i BP</option>
        </select>
      </div>
      <div className="index__memory">
        <p>3.</p>
        <select
          onBlur={(event) => setMemory(event.target.value)}
          defaultValue={indexVal}
        >
          <option value="1">AX</option>
          <option value="2">BX</option>
          <option value="3">CX</option>
          <option value="4">DX</option>
        </select>
      </div>

      <button onClick={() => calcValue()}>MOV</button>
      <button onClick={() => xchg()}>XCHG</button>

      <div className="push_pop">
        <div
          onClick={(e) => {
            e.preventDefault();
            push(e.target.value);
          }}
          onKeyDown={(e) => {
            e.preventDefault();
            push(e.target.value);
          }}
          role="button"
          tabIndex="0"
        >
          <button value="1">PUSH AX</button>
          <button value="2">PUSH BX</button>
          <button value="3">PUSH CX</button>
          <button value="4">PUSH DX</button>
        </div>
        <div
          onClick={(e) => {
            e.preventDefault();
            pop(e.target.value);
          }}
          onKeyDown={(e) => {
            e.preventDefault();
            push(e.target.value);
          }}
          role="button"
          tabIndex="0"

        >
          <button value="1">POP AX</button>
          <button value="2">POP BX</button>
          <button value="3">POP CX</button>
          <button value="4">POP DX</button>
        </div>
      </div>
    </div>
  );
}
