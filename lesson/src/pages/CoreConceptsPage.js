import {useState} from "react";
import {atom, selector, useRecoilState, useRecoilValue} from "recoil";

export default function CoreConceptsPage(props) {
  return (
    <div>
      <h3>CoreConceptsPage</h3>
      <FontButton />
      <FontButton2 />

      <Text />
    </div>
  );
}

// * Atom
// Atom 是状态的单位。它们可更新也可订阅：当 atom 被更新，每个被订阅的组件都将使用新值进行重渲染。
// 它们也可以在运行时创建。可以使用 atom 替代组件内部的 state。如果多个组件使用相同的 atom，
// 则这些组件共享 atom 的状态。

const fontSizeState = atom({
  key: "fontSizeState",
  default: 14, //默认值 | 初始值
});

function FontButton() {
  // get 、 set
  // const [fontSize, setFontSize] = useState(14);
  // get | set
  const [fontSize, setFontSize] = useRecoilState(fontSizeState);

  return (
    <button onClick={() => setFontSize((size) => size + 1)} style={{fontSize}}>
      Click to Enlarge
    </button>
  );
}

function Text() {
  const fontSize = useRecoilValue(fontSizeState);
  return <p style={{fontSize}}>This text will increase in size too.</p>;
}

// * selector
// selector 是一个纯函数，入参为 atom 或者其他 selector。当上游 atom 或 selector 更新时，
// 将重新执行 selector 函数。组件可以像 atom 一样订阅 selector，当 selector 发生变化时，重新渲染相关组件。

const fontSizeLabelState = selector({
  key: "fontSizeLabelState",
  get: ({get}) => {
    const fontSize = get(fontSizeState);
    const unit = "px";

    return `${fontSize}${unit}`;
  },
});

function FontButton2() {
  const [fontSize, setFontSize] = useRecoilState(fontSizeState);
  const fontSizeLabel = useRecoilValue(fontSizeLabelState);

  return (
    <>
      <div>Current font size: {fontSizeLabel}</div>

      <button onClick={() => setFontSize(fontSize + 1)} style={{fontSize}}>
        2 Click to Enlarge
      </button>
    </>
  );
}
