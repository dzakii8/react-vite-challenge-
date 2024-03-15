import { createBrowserRouter, redirect } from "react-router-dom";
import Home from "./views/Home-page";
import AddLodging from "./views/AddLodging";
import LoginForm from "./components/FormLogin";
import Detail from "./views/Detail";
import Cms from "./views/Cms";
import AddType from "./views/AddType";
import EditLodging from "./views/EditLodging";
import PatchImg from "./views/PatchImg";
import AddUser from "./views/AddUser";
import Types from "./views/Types";
import EditType from "./views/EditType";

const router = createBrowserRouter([
  {
    path: "/login",
    element : <LoginForm/>,
    loader : ()=>{
      let isLogin = localStorage.getItem("access_token")
      if (isLogin) {
        throw redirect("/cms")
      } else {
        return null
      }
    }
  },
  {
    path: "/cms/add-user",
    element : <AddUser/>,
    loader : ()=>{
      let isLogin = localStorage.getItem("access_token")
      if (!isLogin) {
        throw redirect("/login")
      } else {
        return null
      }
    }
  },
  {
    path: "/",
    element : <Home/>,
  },
  {
    path: "/:id",
    element : <Detail/>,
  },
  {
    path: "/cms",
    element : <Cms/>,
    loader : ()=>{
      let isLogin = localStorage.getItem("access_token")
      if (!isLogin) {
        throw redirect("/login")
      } else {
        return null
      }
    }
  },
  {
    path: "/cms/addLodging",
    element : <AddLodging/>,
    loader : ()=>{
      let isLogin = localStorage.getItem("access_token")
      if (!isLogin) {
        throw redirect("/login")
      } else {
        return null
      }
    }
  },
  {
    path: "/cms/editLodging/:id",
    element : <EditLodging/>,
    loader : ()=>{
      let isLogin = localStorage.getItem("access_token")
      if (!isLogin) {
        throw redirect("/login")
      } else {
        return null
      }
    }
  },
  {
    path: "/cms/deleteLodging/:id",
    element : <Cms/>,
    loader : ()=>{
      let isLogin = localStorage.getItem("access_token")
      if (!isLogin) {
        throw redirect("/login")
      } else {
        return null
      }
    }
  },
  {
    path: "/cms/patchImg/:id",
    element : <PatchImg/>,
    loader : ()=>{
      let isLogin = localStorage.getItem("access_token")
      if (!isLogin) {
        throw redirect("/login")
      } else {
        return null
      }
    }
  },
  {
    path: "/cms/types",
    element : <Types/>,
    loader : ()=>{
      let isLogin = localStorage.getItem("access_token")
      if (!isLogin) {
        throw redirect("/login")
      } else {
        return null
      }
    }
  },
  {
    path: "/cms/addType",
    element : <AddType/>,
    loader : ()=>{
      let isLogin = localStorage.getItem("access_token")
      if (!isLogin) {
        throw redirect("/login")
      } else {
        return null
      }
    }
  },
  {
    path: "/cms/editType/:id",
    element : <EditType/>,
    loader : ()=>{
      let isLogin = localStorage.getItem("access_token")
      if (!isLogin) {
        throw redirect("/login")
      } else {
        return null
      }
    }
  },
  {
    path: "/?page[size]=10&page[number]=:number",
    element : <Home/>,
    loader : ()=>{
      let isLogin = localStorage.getItem("access_token")
      if (!isLogin) {
        throw redirect("/login")
      } else {
        return null
      }
    }
  },
])

export default router