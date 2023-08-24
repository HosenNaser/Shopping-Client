import { useNavigate } from "react-router-dom";
import style from "./Header.module.scss";

export default function Header() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const goTo = (des: string) => {
    navigate("/" + des);
  };

  return (
    <div className={style.NavBar}>
      <div onClick={() => goTo("")} className={style.title}>
        Shopping Online
      </div>
      <div className={style.nav}>
        <span>
          <a href="mailto:Hosenaser@gmail.com">Contact Us</a>
        </span>
        {!localStorage.username ? (
          <></>
        ) : (
          <div className={style.user}>
            <span>Hello {localStorage.username}</span>
            <button onClick={logout}>Logout</button>
          </div>
        )}
      </div>
    </div>
  );
}
