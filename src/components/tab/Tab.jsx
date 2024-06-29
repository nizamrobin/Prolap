import { TabPanelContext } from "../../App";

export default function Tab({ value, icon }) {
  // console.log(value);
  return (
    <TabPanelContext.Consumer>
      {(tabDispatch) => (
        <li key={value}>
          <button
            onClick={(e) => tabDispatch(value)}
            type="button"
            value={value}
            className="w-8 bg-[#D9196B] text-white focus:bg-[emerald]-700 hover:bg-emerald-700 px-2 py-1 rounded-md capitalize"
          >
            <img src={icon} alt={value} />
          </button>
        </li>
      )}
    </TabPanelContext.Consumer>
  );
}
