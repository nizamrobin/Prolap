import { signOut } from "firebase/auth";
import { TabPanelContext } from "./App";
export default function Signout({ auth }) {
  const signOutHandler = () => {
    signOut(auth);
  };
  return (
    <TabPanelContext.Consumer>
      {(tabDispatch) => (

        <button
        type="button"
        onClick={signOutHandler}
        className="font-bold tracking-wider uppercase"
        >
      Sign Out
    </button>
      )}
      </TabPanelContext.Consumer>
  );
}
