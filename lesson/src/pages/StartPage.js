import {atom, selector, useRecoilState, useRecoilValue} from "recoil";

export default function StartPage(props) {
  return (
    <div>
      <h5>StartPage</h5>

      <TextInput />
      <CharacterCount />
    </div>
  );
}

const textState = atom({
  key: "textState", // 唯一ID
  default: "", // 默认值/初始值
});

function TextInput() {
  // 当你同时需要对 atom 进行读写时，使用此 hook。使用此 hook 会使组件订阅 atom。
  const [text, setText] = useRecoilState(textState);

  const onChange = (event) => {
    setText(event.target.value);
  };

  return (
    <div>
      <input type="text" value={text} onChange={onChange} />
      <br />
      Echo: {text}
    </div>
  );
}

// 抽离派生逻辑，复用
const charCountState = selector({
  key: "charCountState", // 全局下保持唯一性
  get: ({get}) => {
    const text = get(textState);
    // todo 省略非常非常复杂的派生逻辑
    return text.length;
  },
});

// * 派生状态
function CharacterCount() {
  // 当你仅需要读取 atom 时，使用此 hook。使用此 hook 会使组件订阅 atom。
  const count = useRecoilValue(charCountState);

  return <p>Character Count: {count}</p>;
}
