import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export default function GoogleAuth({ auth, addUser }) {
  const provider = new GoogleAuthProvider();

  return (
    // <>
    //   <h3>Sign in with Google account.</h3>
    <button
      onClick={async () => {
        await signInWithPopup(auth, provider);
        addUser();
      }}
      className="font-bold tracking-wider uppercase"
    >
      <img
        src="./src/assets/google-signin.png"
        type="button"
        className="w-48"
      />
    </button>
    // </>
  );
}
