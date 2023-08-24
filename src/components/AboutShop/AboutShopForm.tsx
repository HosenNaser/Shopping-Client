import style from "./About.module.scss";
export default function AboutShopForm() {
  return (
    <div className={style.main}>
      <div className={style.img}>
        <img src="https://cdn.pixabay.com/photo/2017/03/13/17/26/ecommerce-2140604__340.jpg" alt="" />
      </div>
      <div className={style.info}>
        <span>
          They have no physical shop that people can visit. For example, Amazon.com sells nearly all of its goods online
          through its e-commerce platform. NewEgg, Ocado, and TigerDirect also focus primarily on online shopping
          facilities.
        </span>
      </div>
    </div>
  );
}
