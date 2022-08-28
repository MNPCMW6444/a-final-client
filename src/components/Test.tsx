import React from "react";

export default function test() {
  function objectKeys<T extends {}>(obj: T) {
    return Object.keys(obj).map((objKey) => objKey as keyof T);
  }

  const a = objectKeys({
    hi: 234,
    h2i: "asdasd",
    2314: ["awdsd", 234, { a: "a" }],
    hiawd: new Date(),
  });
  const b = a[2];
  debugger;
  return <div></div>;
}
