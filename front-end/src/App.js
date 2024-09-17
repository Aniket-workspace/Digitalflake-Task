import logo from "./logo.svg";
import "./App.css";
import SideBar from "./components/SideBar";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CategoryList from "./pages/category/CategoryList";
import SubcategoryList from "./pages/subcategory/SubcategoryList.js";
import ProductList from "./pages/product/ProductList.js";
import AddCategory from "./pages/category/AddCategory";
import AddSubcategory from "./pages/subcategory/AddSubcategory.js";
import AddProduct from "./pages/product/AddProduct.js";
import Login from "./pages/Login.js";
import PrivateComp from "./components/PrivateComp.js";
import SignUp from "./pages/SignUp.js";

function App() {
  const user = localStorage.getItem("user");

  return (
    <div className="App">
      <BrowserRouter>
        <SideBar>
          <Routes>
            <Route element={<PrivateComp />}>
              <Route path="/home" element={<Home />} />
              <Route path="/category" element={<CategoryList />} />
              <Route path="/subcategory" element={<SubcategoryList />} />
              <Route path="/Products" element={<ProductList />} />
              <Route path="/add-category" element={<AddCategory />} />
              <Route path="/add-subcategory" element={<AddSubcategory />} />
              <Route path="/add-product" element={<AddProduct />} />
            </Route>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </SideBar>
      </BrowserRouter>
    </div>
  );
}

export default App;
