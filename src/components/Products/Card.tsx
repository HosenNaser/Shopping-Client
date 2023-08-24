import { useEffect, useState } from "react";
import style from "./Card.module.scss";
export default function Card({ pro }: any) {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    if (localStorage.Category !== null && category.length === 0) {
      setCategory(JSON.parse(localStorage.getItem("Category") as string));
    }
  }, [category]);
  const AddToCart = async () => {
    let cart = {
      productID: pro._id,
      finalPrice: pro.price,
      cartID: localStorage.ActiveCart,
    };
    await fetch("https://vacations-server.onrender.com/carts/Item", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cart),
    });
    window.location.reload();
  };

  return (
    <div className={style.card}>
      <img src={pro.image} alt="" />
      <div className={style.info}>
        <label>Name: {pro.name}</label>
        <label>
          Category:{" "}
          {category?.map((e: any) => {
            if (e._id === pro.category) {
              return e.name;
            } else return null;
          })}
        </label>
        <label>Price: {pro.price}$</label>
      </div>
      <button onClick={AddToCart}>Add To Cart</button>
    </div>
  );
}
