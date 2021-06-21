import * as React from "react";
const CountContext = React.createContext();

const initialValue = {
  data_memory: [
    {
      id: 1,
      title: "AX",
      value: "0000",
    },
    {
      id: 2,
      title: "BX",
      value: "0000",
    },
    {
      id: 3,
      title: "CX",
      value: "0000",
    },
    {
      id: 4,
      title: "DX",
      value: "0000",
    },
  ],
  index_memory: [
    {
      id: 5,
      title: "SI",
      value: "0000",
    },
    {
      id: 6,
      title: "DI",
      value: "0000",
    },
    {
      id: 7,
      title: "BP",
      value: "0000",
    },
    {
      id: 8,
      title: "SP",
      value: "0000",
    },
    {
      id: 9,
      title: "DISP",
      value: "0000",
    },
  ],
  segment_danych: [],
  segment_stosa: [],
  index_stos: 0,
};

function genRanHex(size) {
  return [...Array(size)]
    .map(() => Math.floor(Math.random() * 16).toString(16))
    .join("");
}

function checkHex(text) {
  if (text.length === 0) return true;

  var re = /^[0-9a-fA-F]+$/;
  return re.test(text);
}

function mainReducer(state, action) {
  switch (action.type) {
    case "change": {
      const result = state[action.state.type].map((item) => {
        if (item.id === action.state.id)
          return {
            ...item,
            value: checkHex(action.state.value)
              ? action.state.value
              : item.value,
          };
        return item;
      });

      return { ...state, [action.state.type]: result };
    }

    case "reset": {
      const result = state[action.state].map((item) => {
        return { ...item, value: "0000" };
      });

      return { ...state, [action.state]: result };
    }

    case "random": {
      const result = state[action.state].map((item) => {
        if (item.title !== "SP") return { ...item, value: genRanHex(4) };
        return item;
      });

      return { ...state, [action.state]: result };
    }

    case "mov": {
      if (action.state.to !== action.state.from) {
        state.data_memory[--action.state.to].value =
          state.data_memory[--action.state.from].value;
      }

      return { ...state };
    }
    case "xchg": {
      if (action.state.to !== action.state.from) {
        --action.state.to;
        --action.state.from;

        const value = state.data_memory[action.state.to].value;
        state.data_memory[action.state.to].value =
          state.data_memory[action.state.from].value;

        state.data_memory[action.state.from].value = value;
        return { ...state };
      }

      return { ...state };
    }

    case "reg_to_mem": {
      if (state.segment_danych.some((val) => val.index === action.state.index))
        return { ...state };
      state.segment_danych.push(
        {
          index: action.state.index[0],
          value: action.state.value.slice(0, 2),
        },
        {
          index: action.state.index[1],
          value: action.state.value.slice(2, 4),
        }
      );
      return { ...state };
    }

    case "mem_to_reg": {
      let valueMemory;
      for (let i = 0; i < state.segment_danych.length; i++) {
        const item = state.segment_danych[i];
        if (item.index === action.state.index_register) {
          valueMemory = item.value + state.segment_danych[++i].value;
          item.value = "";
          state.segment_danych[i].value = "";
        }
      }
      state.data_memory[action.state.index].value = valueMemory;

      state.segment_danych = state.segment_danych.filter(
        (item) => item.value !== ""
      );

      return { ...state };
    }

    case "reg_mem_xchg": {
      let valueMem = action.state.value,
        indexMem = action.state.index_register,
        index = action.state.index,
        valueDane;

      for (let i = 0; i < state.segment_danych.length; i++) {
        const item = state.segment_danych[i];
        if (item.index === indexMem) {
          valueDane = item.value + state.segment_danych[++i].value;
          item.value = valueMem.slice(0, 2);
          state.segment_danych[i].value = valueMem.slice(2, 4);
        }
      }

      state.data_memory[index].value = valueDane;

      return { ...state };
    }

    case "push": {
      let { index, value } = action.state;
      const value_stos = state.data_memory[--index].value;

      state.segment_stosa.push({
        index: ++state.index_stos,
        value: value_stos,
      });
      state.index_memory[3].value = value;
      return { ...state };
    }

    case "pop": {
      let { index } = action.state;
      const { value } = state.segment_stosa.pop();
      --state.index_stos;
      state.data_memory[--index].value = value;

      return { ...state };
    }

    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}
function CountProvider({ children }) {
  const [state, dispatch] = React.useReducer(mainReducer, initialValue);
  const value = { state, dispatch };
  return (
    <CountContext.Provider value={value}>{children}</CountContext.Provider>
  );
}

function useLogic() {
  const context = React.useContext(CountContext);
  if (context === undefined) {
    throw new Error("useLogic must be used within a CountProvider");
  }
  return context;
}
export { CountProvider, useLogic };
