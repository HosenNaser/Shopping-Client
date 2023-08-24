import AboutShopForm from "../components/AboutShop/AboutShopForm";
import LoginForm from "../components/Login/LoginForm";
import ShopInfoForm from "../components/ShopInfo/ShopInfoForm";
import style from "../style/Login.module.scss";
export default function Login() {
  return (
    <div className={style.Main}>
      <div className={style.Container}>
        <div className={style.Form}>
          <LoginForm />
        </div>
        <div className={style.Form}>
          <AboutShopForm />
        </div>
        <div className={style.Form}>
          <ShopInfoForm />
        </div>
      </div>
    </div>
  );
}
