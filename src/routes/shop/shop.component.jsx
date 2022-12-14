import { useContext } from "react";
import { CategoriesContext } from "../../contexts/categories.context";
import Category from "../category/category.component";
import { Routes, Route } from "react-router-dom";
import "./shop.styles.scss";
import CategoriesPreview from "../categories-preview/categories-preview.component";

const Shop = () => {
  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};

export default Shop;
