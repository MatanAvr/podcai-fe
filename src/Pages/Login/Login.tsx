import { Button } from "../../Components/UI/Button/Button";
import { Input } from "../../Components/UI/Input/Input";
import "./Login.scss";

export const Login = () => {
  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="login-wrapper">
      <h1>Login</h1>
      <form className="form-wrapper" onSubmit={submitHandler}>
        <Input value="" placeholder="Email" type="underline" />
        <Input value="" placeholder="Password" type="underline" />
        <Button text="Login" type="outline" />
      </form>
    </div>
  );
};
