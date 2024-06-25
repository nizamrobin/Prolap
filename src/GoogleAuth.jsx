import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export default function GoogleAuth({ auth, addUser, content}) {
  const provider = new GoogleAuthProvider();

  return (
    <button
      onClick={async () => {
        await signInWithPopup(auth, provider);
        addUser();
      }}
      className="font-bold tracking-wider uppercase"
    >
      {content}

    </button>
  );
}
