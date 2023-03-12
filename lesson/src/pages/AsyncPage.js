import {atom, selectorFamily, useRecoilState} from "recoil";
import {useState, Suspense} from "react";

export default function AsyncPage(props) {
  const [userId, setUserId] = useState(1);

  const refresh = () => {
    setUserId(userId + 1);
  };
  return (
    <div>
      <h3>AsyncPage</h3>

      <button onClick={refresh}>refresh</button>
      <Suspense fallback={<h1>loading</h1>}>
        <UserData userId={userId} />
      </Suspense>
    </div>
  );
}

const userState = selectorFamily({
  key: "user",
  get:
    ({userId}) =>
    async () => {
      const userData = await fetch(`https://randomuser.me/api`).then((res) =>
        res.json()
      );
      return userData.results[0];
    },
});

function UserData({userId}) {
  const [user, setUser] = useRecoilState(userState(userId));

  return <p>name: {user?.name?.first}</p>;
}
