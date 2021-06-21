import * as React from "react";

export default function Options({ value, fn }) {
  return (
    <select onBlur={(event) => fn(event.target.value)} defaultValue={value}>
      <option value="1">AX</option>
      <option value="2">BX</option>
      <option value="3">CX</option>
      <option value="4">DX</option>
    </select>
  );
}
