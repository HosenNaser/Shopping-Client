import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "./Login.module.scss";
export default function LoginForm() {
  const name = useRef<HTMLInputElement | null>(null);
  const pass = useRef<HTMLInputElement | null>(null);
  const goTo = useNavigate();
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const loginBtn = async () => {
    const userInfo = { username: name.current?.value, password: pass.current?.value };
    setLoading(true);
    setMsg("");

    const res = await fetch("https://vacations-server.onrender.com/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userInfo),
    })
      .then((res) => {
        setLoading(false);
        return res.json();
      })
      .catch((err) => {
        setLoading(false);
        setMsg("server not connected");
      });

    if (!res.success) {
      setMsg(res.message);
    } else {
      localStorage.username = res.user.username;
      localStorage.role = res.user.role;
      localStorage.id = res.user._id;
      window.location.reload();
    }
  };
  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <>
      {localStorage.username ? (
        <>
          <div>
            <span>Welcome {localStorage.username}</span>
          </div>
          <div>
            <button onClick={logout}>Logout</button>
            <button onClick={() => goTo("/Store")}>Continue Shopping</button>
          </div>
        </>
      ) : (
        <>
          <div className={style.title}>
            <span>Login Now</span>
          </div>
          <div>
            <input ref={name} placeholder="Username" disabled={loading} type="text" />
          </div>
          <div>
            <input ref={pass} placeholder="Password" disabled={loading} type="password" />
          </div>
          <div>
            <label style={{ color: "red", fontSize: 22 }}>{msg !== "" ? msg : null}</label>
          </div>

          <div>
            {loading ? (
              <h4>loading</h4>
            ) : (
              <div>
                <button type="submit" onClick={loginBtn}>
                  Login
                </button>
              </div>
            )}
          </div>
          <span>
            Don't have account?<Link to="/Register">Register Now</Link>
          </span>
        </>
      )}
    </>
  );
}
