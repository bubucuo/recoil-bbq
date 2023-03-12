import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  NavLink,
  Outlet,
} from "react-router-dom";
import {RecoilRoot} from "recoil";
import "./index.css";
import CoreConceptsPage from "./pages/CoreConceptsPage";
import StartPage from "./pages/StartPage";
import AsyncPage from "./pages/AsyncPage";
import TodoListPage from "./pages/TodoListPage";
import AsyncPage2 from "./pages/AsyncPage2";
import FamilyPage from "./pages/FamilyPage";

function NavLink2({...props}) {
  let activeStyle = {
    color: "red",
  };
  return (
    <NavLink
      {...props}
      style={({isActive}) => (isActive ? activeStyle : undefined)}
    />
  );
}
function Root() {
  let activeClassName = "underline";
  return (
    <div>
      <NavLink2 to="/">核心概念:atom与selector的基础使用</NavLink2>
      <NavLink2 to="start">快速上手</NavLink2>
      <NavLink2 to="todo">todo list</NavLink2>
      <NavLink2 to="family">family</NavLink2>
      <NavLink2 to="async">异步获取数据</NavLink2>
      <NavLink2 to="async2">异步获取数据2</NavLink2>

      <Outlet />
    </div>
  );
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<CoreConceptsPage />} />
      <Route path="start" element={<StartPage />} />
      <Route path="todo" element={<TodoListPage />} />
      <Route path="family" element={<FamilyPage />} />

      <Route path="async" element={<AsyncPage />} />
      <Route path="async2" element={<AsyncPage2 />} />
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <RecoilRoot>
    <RouterProvider router={router} />
  </RecoilRoot>
);
