import {
  atom,
  selectorFamily,
  selector,
  useRecoilValue,
  useRecoilState,
} from "recoil";
import {Suspense} from "react";

export default function AsyncPage(props) {
  return (
    <div>
      <h3>AsyncPage</h3>

      <Suspense fallback={<h1>loading</h1>}>
        <UserData />
      </Suspense>
    </div>
  );
}

const userAtomState = atom({key: "userAtom", default: {}});

const userState = selectorFamily({
  key: "user",
  get: (userId: number) => async () => {
    const userData = await fetch(`https://randomuser.me/api`).then((res) =>
      res.json()
    );
    if (userId === 4) throw new Error("User does not exist");

    return userData.results[0];
  },
  set: ({set, get}, value) => {
    console.log(
      "%c [  ]-16",
      "font-size:13px; background:pink; color:#bf2c9f;",
      value
    );
  },
});

function UserData(props) {
  // const user = useRecoilValue(userState());

  const [user, setUser] = useRecoilState(userState());

  if (!user) {
    return null;
  }

  return (
    <div>
      <h4>User</h4>
      <button
        onClick={() => {
          setUser(userState());
        }}>
        refresh user data
      </button>

      <p>name: {user.name.first}</p>
    </div>
  );
}
