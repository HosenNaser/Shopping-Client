import { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./inputs.module.scss";

export default function Confirm(params: any) {
  const [loading, setLoading] = useState(false);
  const navigator = useNavigate();
  const { values } = params;

  const prev = (e: any) => {
    e.preventDefault();
    params.prevStep();
  };

  const confirmData = async () => {
    setLoading(true);
    let user = values;
    console.log(user);

    const res = await fetch("https://vacations-server.onrender.com/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((res) => {
        setLoading(false);
        return res.json();
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
    console.log(res);

    if (res.success) {
      navigator("/");
    }
  };
  return (
    <div className={style.FormContainer}>
      <div className={style.form}>
        <div className={style.title}>
          <span>User Details!!</span>
        </div>
        <div>
          <label>ID :</label>
          <label>{values.ID}</label>
        </div>
        <div>
          <label>Username : {values.username}</label>
        </div>
        <div>
          <label>First Name : {values.firstName}</label>
        </div>
        <div>
          <label>Last Name : {values.lastName}</label>
        </div>
        <div>
          <label>City : {values.city}</label>
        </div>
        <div>
          <label>Street : {values.street}</label>
        </div>
        <div className={style.Btn}>
          <button disabled={loading} onClick={prev}>
            Back
          </button>
          <button disabled={loading} onClick={confirmData}>
            Confirm
          </button>
        </div>
        {loading ? <label>Loading</label> : null}
      </div>
    </div>
  );
}
