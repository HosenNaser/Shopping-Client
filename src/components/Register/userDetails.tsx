import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./inputs.module.scss";

export default function UserDetails(params: any) {
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { values, handleChange } = params;

  let confirmPassword = useRef<HTMLInputElement | null>(null);

  const next = async (e: any) => {
    setMsg("");
    if (values.ID !== "") {
      const checkID = await fetch("https://shopping-server-dt7s.onrender.com/users/checkID", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ID: values.ID }),
      })
        .then((res) => {
          return res.json();
        })
        .catch((err) => {
          console.log(err);
        });

      if (!checkID.success) {
        setMsg(checkID.message);
      } else if (values.username !== "") {
        const checkUser = await fetch("https://shopping-server-dt7s.onrender.com/users/checkUser", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: values.username }),
        })
          .then((res) => {
            return res.json();
          })
          .catch((err) => {
            console.log(err);
          });

        if (!checkUser.success) {
          setMsg(checkUser.message);
        } else if (confirmPassword.current?.value === values.password && values.password !== "") {
          e.preventDefault();
          params.nextStep();
        } else {
          setMsg("Passwords doesn't match");
        }
      } else {
        setMsg("Missing Values");
      }
    } else {
      setMsg("Missing Values");
    }
  };

  return (
    <div className={style.FormContainer}>
      <div className={style.form}>
        <div className={style.title}>
          <span>User Details!!</span>
        </div>
        <table>
          <tbody>
            <tr>
              <td>
                <input placeholder="ID" type="text" value={values.ID} onChange={handleChange("ID")} required />
              </td>
              <td>
                <input
                  placeholder="username"
                  type="text"
                  value={values.username}
                  onChange={handleChange("username")}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <input
                  placeholder="Password"
                  type="password"
                  value={values.password}
                  onChange={handleChange("password")}
                  required
                />
              </td>
              <td>
                <input ref={confirmPassword} placeholder="Confirm Password" type="password" required />
              </td>
            </tr>
          </tbody>
        </table>
        {msg !== "" ? <div style={{ color: "red" }}>{msg}</div> : null}
        <div className={style.Btn}>
          <button onClick={() => navigate("/")}>Back</button>
          <button onClick={next}>Next</button>
        </div>
      </div>
    </div>
  );
}
