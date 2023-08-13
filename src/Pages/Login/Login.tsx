import { useState } from "react";
import { Button } from "../../Components/UI/Button/Button";
import { Input } from "../../Components/UI/Input/Input";
import { loginRequest } from "../../ConstAndTypes/consts";
import "./Login.scss";
import { ApiClient } from "../../Services/axios";
import { useAppDispatch } from "../../Hooks/Hooks";
import { setAuth } from "../../Features/User/User";
import { LoadingSpinner } from "../../Components/UI/LoadingSpinner/LoadingSpinner";
import { moveToPage } from "../../Features/Navigation/Navigation";

const apiClientInstance = ApiClient.getInstance();

const defaultUser: loginRequest = {
  email: "matan@test.com",
  password: "1234",
};

export const Login = () => {
  const [user, setUser] = useState<loginRequest>(defaultUser);
  const [audioTracksSrc, setAudioTracksSrc] = useState<string[]>([]);
  const [isSending, setIsSending] = useState<boolean>(false);

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
    setIsSending(true);
    const res = await apiClientInstance.userLogin(user);
    if (res.access_token) {
      const token = res.access_token;
      dispatch(setAuth({ newMode: true, token }));
      dispatch(moveToPage("Home"));
    }
    setIsSending(false);
  };

  // const getPodcasts = async () => {
  //   const res = await apiClientInstance.getPodcasts();
  //   setAudioTracksSrc([...res.urls]);
  // };

  // const getEpisodes = async () => {
  //   const res = await apiClientInstance.getEpisodes();
  //   // setAudioTracksSrc([...res.urls]);
  // };

  return (
    <div className="login-wrapper">
      <h1>Login</h1>

      {isSending ? (
        <LoadingSpinner />
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
