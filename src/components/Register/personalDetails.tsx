import style from "./inputs.module.scss";
export default function PersonalDetails(params: any) {
  const { values, handleChange } = params;

  const next = (e: any) => {
    e.preventDefault();
    params.nextStep();
  };
  const prev = (e: any) => {
    e.preventDefault();
    params.prevStep();
  };

  return (
    <div className={style.FormContainer}>
      <div className={style.form}>
        <div className={style.title}>
          <span>Personal Details</span>
        </div>
        <table>
          <tbody>
            <tr>
              <td>
                <input
                  placeholder="First Name"
                  type="text"
                  value={values.firstName}
                  onChange={handleChange("firstName")}
                  required
                />
              </td>
              <td>
                <input
                  placeholder="Last Name"
                  type="text"
                  value={values.lastName}
                  onChange={handleChange("lastName")}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <input placeholder="City" type="text" value={values.city} onChange={handleChange("city")} required />
              </td>
              <td>
                <input
                  placeholder="Street"
                  type="text"
                  value={values.street}
                  onChange={handleChange("street")}
                  required
                />
              </td>
            </tr>
          </tbody>
        </table>

        <div className={style.Btn}>
          <button onClick={prev}>Back</button>
          <button onClick={next}>Continue</button>
        </div>
      </div>
    </div>
  );
}
