import { useState } from "react";
import CheckOut from "../CheckOut/checkOut";
import style from "../Store/cart.module.scss";

export default function CheckCart() {
  const [cartItems, setCartItems] = useState([]);
  const [popup, setPopup] = useState(false);
  const [flag, setFlag] = useState(true);
  const [total, setTotal] = useState(-1);
  const userID = localStorage.id;
  let products = new Array(0);
  if (localStorage.products) {
    products = JSON.parse(localStorage.products);
  }
  if (total === -1 && cartItems.length !== 0) {
    let final = 0;
    cartItems.forEach((e: any) => {
      final += e.finalPrice;
    });
    setTotal(final);
  }
  const cart = async () => {
    if (flag) {
      setFlag(false);
      await fetch(`https://shopping-server-dt7s.onrender.com/carts/Cart/${userID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((data) => {
          localStorage.ActiveCart = data.cart._id;
          setCartItems(data.CartItem);
        })
        .catch((err) => console.log(err));
    }
  };
  cart();

  return (
    <>
      {popup ? <CheckOut setPopup={setPopup} total={total} /> : null}
      <div className={style.list}>
        <>
          <table>
            <thead>
              <tr>
                <td>Name</td>
                <td>Amount</td>
              </tr>
            </thead>
            <tbody>
              {cartItems.length === 0
                ? "Cart is empty"
                : cartItems.map((e: any) => {
                    return (
                      <tr key={e._id}>
                        <td>
                          {products.map((p: any) => {
                            if (p._id === e.productID) {
                              return <h3>{p.name}</h3>;
                            } else return null;
                          })}
                        </td>
                        <td>{e.amount}</td>
                      </tr>
                    );
                  })}
            </tbody>
          </table>
        </>
        <div className={style.Order}>
          <span>Total:{total}$</span>
        </div>
      </div>
    </>
  );
}
