import { useState } from "react";
import { Button } from "../../Components/UI/Button/Button";
import { Input } from "../../Components/UI/Input/Input";
import { loginRequest } from "../../ConstAndTypes/consts";
import "./Login.scss";
import { ApiClient } from "../../Services/axios";

const apiClientInstance = new ApiClient();

const defaultUser: loginRequest = {
  email: "ronavr55@gmail.com",
  password: "123",
};

export const Login = () => {
  const [user, setUser] = useState<loginRequest>(defaultUser);
  const [audioTracksSrc, setAudioTracksSrc] = useState<string[]>([]);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id: key, value } = e.target;
    setUser({
      ...user,
      [key]: value,
    });
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await apiClientInstance.userLogin(user);
    console.log(res);
    if (res.access_token) {
      const token = res.access_token;
      setLoggedIn(true);
    }
  };

  const getEpisode = async () => {
    const res = await apiClientInstance.getEpisodes();
    console.log(res);
    setAudioTracksSrc([...res.urls]);
  };

  return (
    <div className="login-wrapper">
      <h1>Login</h1>
      <form className="form-wrapper" onSubmit={submitHandler}>
        <Input
          id="email"
          value={user.email}
          placeholder="Email"
          type="underline"
          onChange={(e) => onChange(e)}
        />
        <Input
          id="password"
          value={user.password}
          placeholder="Password"
          type="underline"
          onChange={(e) => onChange(e)}
        />
        <Button text="Login" type="outline" />
      </form>
      {loggedIn && <div style={{ color: "green" }}>loggedIn</div>}

      <Button text="Get episode" type="outline" onClick={getEpisode} />

      <div className="audio-tracks-wrapper">
        {audioTracksSrc &&
          audioTracksSrc.length > 0 &&
          audioTracksSrc.map((audioTrackSrc, index) => [
            <div key={"ATC" + index} className="audio-track-container">
              {audioTrackSrc}
              <audio src={audioTrackSrc} controls />
            </div>,
          ])}
      </div>
    </div>
  );
};
