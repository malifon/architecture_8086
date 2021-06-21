// TODO
// data: {id: 01 ,title: AX, value: 0000}
// segment: {index: 1234, value: FF}
// DataLayout - {data{}} reset, random
// InputDataLayout: {title} render => AX input, check that 16digit system
// MemoryLayout: render => MOV/XCHNG two selectors button OK, change data at the InputDataLayout
// SegmentLayout: (tables) render table => index: value
// RegistrLayout: selectors; | indexes: (title, value)
import * as React from "react";
import App from "../components/App";
import "../components/sass/index.sass";
import { CountProvider } from "../context/main-context";

const IndexPage = () => {
  return (
    <CountProvider>
      <title>Architecture 8086</title>
      <App />
    </CountProvider>
  );
};

export default IndexPage;
