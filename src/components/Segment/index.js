import * as React from "react";

export default function Segment({ data, title }) {
  return (
    <>
      <h2 className="segment-title">{title}</h2>
      <table>
        <thead>
          <tr>
            <th className="index-title">Index</th>
            <th className="value-title">Value</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, key) => {
            return (
              <tr key={key}>
                <td className="index">{item.index}</td>
                <td className="value">{item.value}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
