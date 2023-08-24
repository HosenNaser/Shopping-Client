import { useState } from "react";
import Products from "../components/Products/products";
import UserCart from "../components/Store/cart";
import Search from "../components/Store/search";
import style from "../style/Store.module.scss";
export default function Store() {
  const [filter, setFilter] = useState("");
  const [category, setCategory] = useState("");

  const handleSearch = (e: { target: { value: any } }) => {
    setFilter(e.target.value);
  };
  const handleCategory = (e: { target: { value: any } }) => {
    setCategory(e.target.value);
  };

  return (
    <div className={style.main}>
      <div className={style.bottom}>
        {localStorage.role === "admin" ? null : (
          <div className={style.cart}>
            <UserCart />
          </div>
        )}
        <div className={style.store}>
          <div className={style.filter}>{<Search handleSearch={handleSearch} handleCategory={handleCategory} />}</div>
          <div className={style.products}>
            <Products filter={filter} category={category} />
          </div>
        </div>
      </div>
    </div>
  );
}
