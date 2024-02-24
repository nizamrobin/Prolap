export default function Tabs({ setTab }) {
  // setTabb = (e) => {
  //   console.log(e.value);
  // };
  return (
    <ul className="bg-slate-100 flex gap-4 p-2 absolute top-20">
      <li key="1">
        <button
          onClick={(e) => setTab(e.target.value)}
          type="button"
          value="friends"
          className="bg-emerald-200 active:bg-emerald-300 px-2 py-1 rounded-md"
        >
          Friends
        </button>
      </li>
      <li key="2">
        <button
          onClick={(e) => setTab(e.target.value)}
          type="button"
          value="f1"
          className="bg-emerald-200 active:bg-emerald-300 px-2 py-1 rounded-md"
        >
          f1
        </button>
      </li>
      <li key="3">
        <button
          onClick={(e) => setTab(e.target.value)}
          type="button"
          value="f2"
          className="bg-emerald-200 active:bg-emerald-300 px-2 py-1 rounded-md"
        >
          F2
        </button>
      </li>
      <li key="4">
        <button
          onClick={(e) => setTab(e.target.value)}
          type="button"
          value="f3"
          className="bg-emerald-200 active:bg-emerald-300 px-2 py-1 rounded-md"
        >
          F3
        </button>
      </li>
    </ul>
    // <Friends />
  );
}
