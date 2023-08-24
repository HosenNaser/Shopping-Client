import { useState } from "react";
import style from "./ShopInfo.module.scss";
export default function ShopInfoForm() {
  const [products, setProducts] = useState(0);
  const [orders, setOrders] = useState(0);
  const [msg, setMsg] = useState("");
  const [flag, setFlag] = useState(true);

  const getInfo = async () => {
    if (flag) {
      setFlag(false);
      await fetch("https://shopping-server-dt7s.onrender.com/carts/Available")
        .then((res) => res.json())
        .then((data) => {
          setOrders(data.Orders);
          setProducts(data.Products);
        })
        .catch((err) => {
          console.log(err);
        });

      if (localStorage.username) {
        let userID = localStorage.id;
        await fetch(`https://shopping-server-dt7s.onrender.com/carts/Cart/Active/${userID}`)
          .then((res) => res.json())
          .then((data) => {
            if (data.cart) localStorage.ActiveCart = data.cart._id;
            setMsg(data.message);
          })
          .catch((err) => console.log(err));
      }
    }
  };
  getInfo();
  return (
    <div className={style.main}>
      <div className={style.info}>
        <span>Available Products: {products}</span>
        <span>Number Of Orders: {orders}</span>
        <span style={{ color: "red" }}>{msg !== "" ? msg : null}</span>
      </div>
    </div>
  );
}
