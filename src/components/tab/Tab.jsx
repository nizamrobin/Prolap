import { TabPanelContext } from "../../App";

export default function Tab({ value }) {
  // console.log(value);
  return (
    <TabPanelContext.Consumer>
      {(tabDispatch) => (
        <li key={value}>
          <button
            onClick={(e) => tabDispatch(e.target.value)}
            type="button"
            value={value}
            className="bg-emerald-500 text-white focus:bg-[emerald]-700 hover:bg-emerald-700 px-2 py-1 rounded-md capitalize"
          >
            {value}
          </button>
        </li>
      )}
    </TabPanelContext.Consumer>
  );
}
