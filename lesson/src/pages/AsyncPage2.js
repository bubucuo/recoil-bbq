import {
  atom,
  selectorFamily,
  useRecoilState,
  selector,
  useRecoilValue,
  atomFamily,
  useSetRecoilState,
  useResetRecoilState,
  useRecoilStateLoadable,
} from "recoil";

export default function AsyncPage2(props) {
  return (
    <div>
      <h3>AsyncPage2</h3>

      <UserData />
    </div>
  );
}

const userState = selectorFamily({
  key: "user",
  get: (userId) => async () => {
    const userData = await fetch(`https://randomuser.me/api`).then((res) =>
      res.json()
    );

    return userData.results[0];
  },
});

function UserData({userId}) {
  const [userLoadable, setUser] = useRecoilStateLoadable(userState());

  switch (userLoadable.state) {
    case "hasValue":
      const user = userLoadable.contents;
      return <p>name: {user.name?.first}</p>;
    case "loading":
      return <h1>loading...</h1>;
    case "hasError":
      throw userLoadable.contents;
  }
}
