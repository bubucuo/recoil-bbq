# lesson1 十分钟快速上手Recoil

[TOC]



## 资源

1. [Recoil英文网](https://recoiljs.org/)
2. [Recoil中文网](https://www.recoiljs.cn/)

2. [Recoil的github地址](https://github.com/facebookexperimental/Recoil)
3. [本文代码地址](https://github.com/bubucuo/recoil-bbq)



## 知识点

### Recoil是什么

​		**一个React 状态管理库。**

​		Recoil是Facebook开发的状态管理库，目标是**做一个高性能的状态管理库，并且可以使用React内部的调度机制，包括会支持并发模式**，虽然目前还处于试验阶段，但是Facebook内部已经有部分在使用，因此对于前端开发者来说，尤其是使用React的，早下手为强！

#### 简练并保持与 React 一致

​		Recoil 的行为方式和原理与 React 完全一致。将其使用到你的应用程序中能够获得快速且灵活的状态共享。

#### 数据流图

​		派生数据和异步查询均采用纯函数和高效的订阅方式实现。

#### 应用程序全局监听

​		通过监听应用程序中所有状态的变化来实现持久化存储、路由、时间旅行调试或撤消，并且不会影响代码拆分。



### 背景

#### redux

![image-20201123152203312](https://tva1.sinaimg.cn/large/0081Kckwly1gkz4uuxugzj316q0juwph.jpg)

#### 	mobx

![image-20201124155837753](https://tva1.sinaimg.cn/large/0081Kckwly1gl0bj7i5i7j319407iq58.jpg)



​	出于兼容性和简便性的考虑，React中最好使用状态管理库。目前React中常见状态库有redux、mobx，但是这些状态管理库，也许也不是那么”友好“：

- 只能通过状态提升至公共祖先来共享状态，但可能导致一颗巨大的树重新渲染。

- 上下文（context）只能存储一个值，而不能存储一组不确定的值，且每个值都有自己的使用者（consumers）。

- 这两种方式都很难将组件树的叶子节点（使用状态的地方）与组件树的顶层（状态必须存在的地方）进行代码分拆。

  在保持 API 以及语义和行为尽可能接近 React 的同时，Recoil对上述问题做了改进。

  ### Recoil    

   Recoil 定义了一个正交有向图（directed graph orthogonal），并附加在 React 树中。状态的变化从该图的根（我们称之为 atom）开始，通过纯函数（我们称之为 selector）的方式传入组件。具体方式如下：

- Recoil创建了无模板（boilerplate-free） API，其共享状态与 React 内部的状态拥有相同的 get/set 接口（如果需要，也可以使用 reducer 等）。
- Recoil有与并发模式（Concurrent Mode）及其他 React 新特性兼容的可能性。
- 状态的定义是增量及分布式的，从而可以进行代码拆分。
- 可以用派生数据替换状态，而无需修改使用它的组件。
- 派生数据可以在同步与异步间切换，而无需修改使用它的组件。
- Recoil可以将导航（navigation）视为一等公民（first-class concept），甚至可以对链接中的状态进行编码。
- 以向后兼容的方式持久保存整个应用程序的状态很容易，因此持久化保存的状态可以在应用程序更改之后继续存在。



### 核心概念

​		Recoil 能创建一个数据流图（data-flow graph），从 *atom*（共享状态）到 *selector*（纯函数），再向下流向 React 组件。Atom 是组件可以订阅的状态单位。selector 可以同步或异步转换此状态。



### 快速上手

安装：

```bash 
yarn add recoil
```



#### RecoilRoot

​		对于使用 Recoil 的组件，需要将 `RecoilRoot` 放置在组件树上的任一父节点处。最好将其放在根组件中：

```jsx
import {RecoilRoot} from "recoil";
import HomePage from "./pages/HomePage";

export default function App(props) {
  return (
    <div className="App">
      <RecoilRoot>
        <HomePage />
      </RecoilRoot>
    </div>
  );
}
```



#### 常用hook函数

##### useRecoilState

 		当组件同时需要读写状态时，推荐使用该 hook。

##### useRecoilValue

 		当一个组件需要在不写入 state 的情况下读取 state 时，推荐使用该 hook。

##### useSetRecoilState

​		返回一个 setter 函数，用来更新可写 Recoil state 的值，状态变化不会导致组件重新渲染。

​		当一个组件需要写入而不需要读取 state 时，推荐使用此 hook。

​		如果组件使用了 [`useRecoilState()`](/docs/api-reference/core/useRecoilState) 来获取 setter 函数，那么同时它也会订阅更新，并在 atom 或 selector 更新时重新渲染。使用 `useSetRecoilState()` 允许组件在值发生改变时而不用给组件订阅重新渲染的情况下设置值。



#### Atom

​		一个 **atom** 代表一个**状态**。Atom 可在任意组件中进行读写。读取 atom 值的组件隐式**订阅**了该 atom，因此任何 atom 的更新都将导致订阅该 atom 的组件重新渲染：

```jsx
import {atom} from "recoil";

const textState = atom({
  key: 'textState', // // 全局下保持唯一性
  default: '', // 初始值
});
```

​		在需要向 atom 读取或写入的组件中，应该使用 `useRecoilState()`，如下所示：

```jsx
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import {textState, charCountState} from "../store/";

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
```



#### Selector

​		**selector** 代表一个**派生状态**，派生状态是状态的**转换**。你可以将派生状态视为将状态传递给以某种方式修改给定状态的纯函数的输出：

```jsx
import {selector} from "recoil";

const charCountState = selector({
  key: 'charCountState', // 全局下保持唯一性
  get: ({get}) => {
    const text = get(textState);

    return text.length;
  },
});
```

​		这里想要获取textState的长度，因此只需读取值就可以 了，可以使用 `useRecoilValue()` 这一 hook：

```jsx
import {useRecoilValue} from "recoil";

function CharacterCount() {
  const count = useRecoilValue(charCountState);

  return <p>Character Count: {count}</p>;
}
```



### 对比Redux、Mobx

		1. Redux是集中式管理state，而Recoil和Mobx都是分散式。
  		2. Recoil中状态的读写都是Hooks函数，目前没有提供类组件的使用方式。
  		3. Recoil是Facebook开发的，可以使用React内部的调度机制，这是Redux和Mobx不支持的。
  		4. Recoil目前还是实验阶段，想要应用到的自己的项目中，建议等待正式版。

