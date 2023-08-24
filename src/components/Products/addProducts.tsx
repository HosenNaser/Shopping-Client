import { useRef } from "react";
import style from "../CheckOut/check.module.scss";
export default function AddProduct(params: { setProPop: Function }) {
  const name = useRef<HTMLInputElement | null>(null);
  const price = useRef<HTMLInputElement | null>(null);
  const image = useRef<HTMLInputElement | null>(null);
  const categoryRef = useRef<HTMLSelectElement | null>(null);

  const { setProPop } = params;
  const category = () => {
    if (localStorage.getItem("Category")) return JSON.parse(localStorage.getItem("Category") as string);
    return [{ _id: "", name: "" }];
  };
  const AddProduct = async () => {
    let Data = {
      name: name.current?.value,
      category: categoryRef.current?.value,
      price: price.current?.value,
      image: image.current?.value,
    };
    const res = await fetch("https://vacations-server.onrender.com/products/Add", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Data),
    })
      .then((res) => res.json())
      .catch((err) => {
        console.log(err);
      });
    setProPop(false);
    localStorage.setItem("products", JSON.stringify(res.products));
    window.location.reload();
  };
  return (
    <div className={style.background}>
      <div className={style.closer} onClick={() => setProPop(false)}></div>
      <div className={style.container}>
        <input ref={name} type="text" placeholder="Name" />
        <input ref={price} type="text" placeholder="Price" />
        <input ref={image} type="text" placeholder="Image Url" />
        <select ref={categoryRef} name="Category">
          {category().map((e: any) => {
            return (
              <option key={e._id} value={e._id}>
                {e.name}
              </option>
            );
          })}
        </select>
        <button onClick={AddProduct}>Add Now</button>
      </div>
    </div>
  );
}
