import { useEffect, useState } from "react";
import CheckOut from "../CheckOut/checkOut";
import style from "./cart.module.scss";

export default function UserCart() {
  const [cartItems, setCartItems] = useState([]);
  const [popup, setPopup] = useState(false);
  const [flag, setFlag] = useState(true);
  const [total, setTotal] = useState(-1);
  const userID = localStorage.id;
  let products = new Array(0);
  if (localStorage.products) {
    products = JSON.parse(localStorage.products);
  }

  useEffect(() => {
    if (total === -1 && cartItems?.length !== 0) {
      let final = 0;
      cartItems?.forEach((e: any) => {
        final += e.finalPrice;
      });
      setTotal(final);
    }
  }, [cartItems]);

  const cart = async () => {
    if (flag) {
      setFlag(false);
      await fetch(`https://vacations-server.onrender.com/carts/Cart/${userID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.CartItem) {
            setCartItems(data.CartItem);
          }
          localStorage.ActiveCart = data.cart._id;

          // window.location.reload();
        })
        .catch((err) => console.log(err));
    }
  };
  cart();

  const RemoveItem = async (e: string) => {
    await fetch(`https://vacations-server.onrender.com/carts/Item/${e}`, {
      method: "Delete",
      headers: { "Content-Type": "application/json" },
    });
    window.location.reload();
  };

  const OrderNow = () => {
    setPopup(true);
  };

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
                <td>Delete</td>
              </tr>
            </thead>
            <tbody>
              {cartItems?.length === 0
                ? "Cart is empty"
                : cartItems?.map((e: any) => {
                    return (
                      <tr key={e._id}>
                        <td>
                          {products?.map((p: any) => {
                            if (p._id === e.productID) {
                              return <h3>{p.name}</h3>;
                            } else return null;
                          })}
                        </td>
                        <td>{e.amount}</td>
                        <td>
                          <button onClick={() => RemoveItem(e._id)}>Remove</button>
                        </td>
                      </tr>
                    );
                  })}
            </tbody>
          </table>
        </>
        <div className={style.Order}>
          <span>Total:{total}$</span>
          <button onClick={OrderNow}>Order Now</button>
        </div>
      </div>
    </>
  );
}
