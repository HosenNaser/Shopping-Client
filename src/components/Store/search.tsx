import { useEffect, useState } from "react";
import AddCategory from "../Categories/addCategory";
import AddProduct from "../Products/addProducts";

export default function Search(params: any) {
  const { handleSearch, handleCategory } = params;
  const [category, setCategory] = useState([]);
  const [update, setUpdate] = useState(true);
  const [popup, setPopup] = useState(false);
  const [proPop, setProPop] = useState(false);

  useEffect(() => {
    if (localStorage.Category === null || localStorage.Category === undefined) {
      if (update) {
        const category = async () => {
          await fetch("https://shopping-server-dt7s.onrender.com/category/")
            .then((res) => res.json())
            .then((data) => {
              setUpdate(false);
              setCategory(data.categories);
              localStorage.setItem("Category", JSON.stringify(data.categories));
            })
            .catch((err) => console.log(err));
        };
        category();
      }
    } else {
      setCategory(JSON.parse(localStorage.getItem("Category") as string));
    }
  }, [update]);

  // const addProduct = () => {};
  return (
    <>
      <div>
        <input placeholder="Find Product" type="text" onChange={(e) => handleSearch(e)} />
      </div>
      <div>
        <select name="Category" id="" onChange={(e) => handleCategory(e)}>
          <option value="">All</option>
          {category.map((e: any) => {
            return (
              <option key={e._id} value={e._id}>
                {e.name}
              </option>
            );
          })}
        </select>
      </div>

      {localStorage.role === "admin" ? (
        <div>
          {popup ? <AddCategory setPopup={setPopup} /> : null}
          {proPop ? <AddProduct setProPop={setProPop} /> : null}
          <button onClick={() => setPopup(true)}>Add Category</button>
          <button onClick={() => setProPop(true)}>Add Product</button>
        </div>
      ) : null}
    </>
  );
}
