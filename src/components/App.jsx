import * as React from "react";
import { useLogic } from "../context/main-context";

import DataLayout from "./DataLayout";
import MemoryIndex from "./MemoryIndex";
import MovXchg from "./MovXchg";
import Segment from "./Segment";

export default function App() {
  const { state } = useLogic();

  return (
    <section className="wrapper grid">
      <div className="segment">
        <Segment data={state.segment_danych} title={"Segment danych"} />
      </div>
      <div className="app">
        <div className="app__memory">
          <DataLayout data={state.data_memory} type={"data_memory"} />
          <MovXchg />
        </div>
        <div className="app__index">
          <DataLayout data={state.index_memory} type={"index_memory"} />
          <MemoryIndex />
        </div>
      </div>
      <div className="segment">
        <Segment data={state.segment_stosa} title={"Segment stosa"} />
      </div>
    </section>
  );
}
