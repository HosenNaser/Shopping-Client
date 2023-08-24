import { useState } from "react";
import style from "../CheckOut/check.module.scss";
export default function AddCategory(params: { setPopup: Function }) {
  const [name, setName] = useState("");
  const { setPopup } = params;
  const Add = async () => {
    const res = await fetch("https://vacations-server.onrender.com/category/Add", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name }),
    })
      .then((res) => res.json())
      .catch((err) => {
        console.log(err);
      });
    setPopup(false);
    localStorage.setItem("Category", JSON.stringify(res.Category));
    window.location.reload();
  };
  return (
    <div className={style.background}>
      <div className={style.closer} onClick={() => setPopup(false)}></div>
      <div className={style.container}>
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <button onClick={Add}>Add Now</button>
      </div>
    </div>
  );
}
