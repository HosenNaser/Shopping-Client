import { useState } from "react";
import PersonalDetails from "../components/Register/personalDetails";
import UserDetails from "../components/Register/userDetails";
import Confirm from "../components/Register/confirm";
export default function RegisterForm() {
  const [state, setState] = useState({
    step: 1,
    firstName: "",
    lastName: "",
    ID: "",
    username: "",
    password: "",
    city: "",
    street: "",
  });

  const nextStep = () => {
    let next = state.step + 1;
    setState((prevState) => ({ ...prevState, step: next }));
  };
  const prevStep = () => {
    let prev = state.step - 1;
    setState((prevState) => ({ ...prevState, step: prev }));
  };

  const handleChange = (input: any) => (e: { target: { value: any } }) => {
    setState((prevState) => ({ ...prevState, [input]: e.target.value }));
  };

  const step = state.step;
  const { firstName, lastName, ID, username, password, city, street } = state;
  const values = { firstName, lastName, ID, username, password, city, street };
  switch (step) {
    case 1:
      return <UserDetails nextStep={nextStep} handleChange={handleChange} values={values} />;
    case 2:
      return <PersonalDetails nextStep={nextStep} prevStep={prevStep} handleChange={handleChange} values={values} />;
    case 3:
      return <Confirm prevStep={prevStep} state={state} values={values} />;
    default:
      return (
        <div>
          <label>This is a multi-step form built with React.</label>
        </div>
      );
  }
}
