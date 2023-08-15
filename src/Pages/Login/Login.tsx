import { useState } from "react";
import { Button } from "../../Components/UI/Button/Button";
import { Input } from "../../Components/UI/Input/Input";
import { loginRequest } from "../../ConstAndTypes/consts";
import "./Login.scss";
import { ApiClient } from "../../Services/axios";
import { useAppDispatch } from "../../Hooks/Hooks";
import { setAuth, setLoggedUser } from "../../Features/User/User";
import { moveToPage } from "../../Features/Navigation/Navigation";
import { DynamicLogo } from "../../Components/UI/DynamicLogo/DynamicLogo";

const apiClientInstance = ApiClient.getInstance();

const defaultUser: loginRequest = {
  email: "",
  password: "",
};
// const defaultUser: loginRequest = {
//   email: "matan@test.com",
//   password: "1234",
// };

export const Login = () => {
  const [user, setUser] = useState<loginRequest>(defaultUser);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id: key, value } = e.target;
    setUser({
      ...user,
      [key]: value,
    });
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const loginRes = await apiClientInstance.userLogin(user);
    if (loginRes.access_token) {
      const token = loginRes.access_token;
      const userToLogIn = loginRes;
      dispatch(setLoggedUser({ newLoggeduser: userToLogIn }));
      dispatch(setAuth({ newMode: true, token }));
      dispatch(moveToPage("Home"));
    }
    setIsLoading(false);
  };

  return (
    <div className="login-wrapper">
      <h1>Login</h1>

      {isLoading ? (
        <DynamicLogo />
      ) : (
        <form className="form-wrapper" onSubmit={submitHandler}>
          <Input
            id="email"
            value={user.email}
            placeholder="Email"
            inputStyle="underline"
            onChange={onChange}
          />
          <Input
            id="password"
            value={user.password}
            placeholder="Password"
            inputStyle="underline"
            onChange={onChange}
          />
          <Button text="Login" type="outline" />
        </form>
      )}
    </div>
  );
};
