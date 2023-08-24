import { useEffect, useState } from "react";
import style from "./Card.module.scss";
import Card from "./Card";
export default function Products(params: any) {
  const [products, setProducts] = useState([]);
  const [update, setUpdate] = useState(true);
  const { filter, category } = params;
  useEffect(() => {
    if (localStorage.products === null || localStorage.products === undefined) {
      if (update) {
        const pro = async () => {
          await fetch("https://shopping-server-dt7s.onrender.com/products/")
            .then((res) => res.json())
            .then((data) => {
              setUpdate(false);
              setProducts(data.products);
              localStorage.setItem("products", JSON.stringify(data.products));
            })
            .catch((err) => console.log(err));
        };
        pro();
      }
    } else {
      setProducts(JSON.parse(localStorage.getItem("products") as string));
    }
  }, [update]);

  return (
    <>
      <div className={style.MainBody}>
        <div className={style.Container}>
          {products.length === 0 ? (
            <label>Add Products TO The Store</label>
          ) : (
            products
              .filter((e: any) => {
                if (filter === "") return true;
                return e.name.includes(filter);
              })
              .filter((cate: any) => {
                if (category === "") return true;
                return cate.category === category;
              })
              .map((pro: any) => {
                return <Card key={pro._id} pro={pro} />;
              })
          )}
        </div>
      </div>
    </>
  );
}
