import { signOut } from "firebase/auth";
export default function Signout({ auth }) {
  const signOutHandler = () => {
    signOut(auth);
  };
  return (
    <button
      type="button"
      onClick={signOutHandler}
      className="font-bold tracking-wider uppercase"
    >
      Sign Out
    </button>
  );
}
