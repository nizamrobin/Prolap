import Tab from "./Tab";
import { useState } from "react";

export default function Tabs({ dispatch, selectedTab }) {
  return (
    <ul className="bg-slate-100 flex gap-4 p-2 absolute top-20">
      <Tab value="friends" dispatch={dispatch} selectedTab={selectedTab} />
      <Tab value="f1" dispatch={dispatch} selectedTab={selectedTab} />
    </ul>
  );
}
