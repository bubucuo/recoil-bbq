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

function Root() {
  return (
    <div>
      <NavLink to="/">核心概念:atom与selector的基础使用</NavLink>
      <NavLink to="abc">快速上手</NavLink>
      <NavLink to="async">异步获取数据</NavLink>
      <Outlet />
    </div>
  );
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<CoreConceptsPage />} />
      <Route path="abc" element={<StartPage />} />
      <Route path="async" element={<AsyncPage />} />
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <RecoilRoot>
    <RouterProvider router={router} />
  </RecoilRoot>
);
