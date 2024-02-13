import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export default function GoogleAuth({ auth }) {
  const provider = new GoogleAuthProvider();

  return (
    // <>
    //   <h3>Sign in with Google account.</h3>
    <button onClick={() => signInWithPopup(auth, provider)}>
      <img
        src="./src/assets/google-signin.png"
        type="button"
        className="w-48"
      />
    </button>
    // </>
  );
}
