import {textState, charCountState} from "../store";
import {useRecoilState, useRecoilValue} from "recoil";

export default function HomePage(props) {
  return (
    <div>
      <h3>HomePage</h3>
      <TextInput />
      <CharacterCount />
    </div>
  );
}

function TextInput(props) {
  const [text, setText] = useRecoilState(textState);
  const onChange = e => {
    setText(e.target.value);
  };
  return (
    <div>
      <input type="text" value={text} onChange={onChange} />
    </div>
  );
}

function CharacterCount(props) {
  const count = useRecoilValue(charCountState);
  return (
    <div>
      <p>{count}</p>
    </div>
  );
}
