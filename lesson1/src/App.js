import HomePage from "./pages/HomePage";
import {RecoilRoot} from "recoil";

export default function App(props) {
  return (
    <div className="App">
      <RecoilRoot>
        <HomePage />
      </RecoilRoot>
    </div>
  );
}
