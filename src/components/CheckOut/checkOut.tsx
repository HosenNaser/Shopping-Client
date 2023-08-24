import { useRef, useState } from "react";
import style from "./check.module.scss";
import CheckCart from "./checkCart";
export default function CheckOut(params: { setPopup: Function; total?: Number }) {
  const { total, setPopup } = params;
  const [msg, setMsg] = useState("");
  const city = useRef<HTMLInputElement | null>(null);
  const street = useRef<HTMLInputElement | null>(null);
  const deliveryDate = useRef<HTMLInputElement | null>(null);
  const verification = useRef<HTMLInputElement | null>(null);

  const SubmitOrder = async () => {
    if (
      verification.current?.value.length !== 4 ||
      deliveryDate.current?.value === "" ||
      street.current?.value === "" ||
      city.current?.value === ""
    ) {
      setMsg("Invalid Inputs");
    } else {
      let data = {
        userID: localStorage.id,
        cartID: localStorage.ActiveCart,
        finalPrice: total,
        city: city.current?.value,
        street: street.current?.value,
        deliveryDate: deliveryDate.current?.value,
        verification: verification.current?.value,
      };
      await fetch("https://shopping-server-dt7s.onrender.com/carts/newOrder", {
        method: "Post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((data) => {
          localStorage.ActiveCart = data.ActiveCart._id;
          setPopup(false);
          window.location.reload();
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <div className={style.background}>
      <div className={style.closer} onClick={() => setPopup(false)}></div>
      <div className={style.container}>
        <div className={style.top}>
          <CheckCart />
          <div className={style.right}>
            <input ref={city} placeholder="City" type="text" />
            <input ref={street} placeholder="street" type="text" />
            <input ref={deliveryDate} placeholder="deliveryDate" type="date" />
            <input ref={verification} placeholder="verification" type="number" />
          </div>
        </div>
        {msg === "" ? null : <label style={{ color: "red" }}>{msg}</label>}
        <button onClick={SubmitOrder}>Submit Order</button>
      </div>
    </div>
  );
}
