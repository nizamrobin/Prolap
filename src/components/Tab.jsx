import { useState } from "react";

export default function Tab({ value, dispatch, selectedTab }) {
  // const [activeBtn, setActiveBtn] = useState(false);
  // console.log("a:" + value, "b:" + selectedTab);
  const [activeBtn, setActiveBtn] = useState(false);

  const clickedTab = async (e) => {
    // selectedTab.type.name.toLowerCase() &&
    //   console.log(e, selectedTab.type.name.toLowerCase());
    // selectedTab.type.name.toLowerCase() &&
    // e === selectedTab.type.name.toLowerCase()
    //   ? setActiveBtn(true)
    //   : setActiveBtn(false);
    setActiveBtn(true);
  };
  return (
    <li key="1">
      <button
        onClick={(e) => {
          dispatch(e.target.value);
          clickedTab(e.target.value);
        }}
        type="button"
        value={value}
        className={`${
          activeBtn ? "bg-emerald-300" : "bg-emerald-200"
        }  focus:bg-emerald-300 hover:bg-emerald-300 px-2 py-1 rounded-md capitalize`}
      >
        {value}
      </button>
    </li>
  );
}
