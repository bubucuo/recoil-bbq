import {atom, selector} from "recoil";

export const textState = atom({
  key: "textState", // 全局下唯一性，
  default: ""
});

export const charCountState = selector({
  key: "charCountState", // 全局下唯一性，
  get: ({get}) => {
    const text = get(textState);

    return text.length;
  }
});
