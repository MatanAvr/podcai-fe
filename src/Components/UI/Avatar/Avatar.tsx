import "./Avatar.scss";
import { BsFillPersonFill } from "react-icons/bs";

interface avatarProps {
  profileImgUrl?: String;
}

export const Avatar = ({ profileImgUrl }: avatarProps) => {
  return (
    <div className={`avatar-wrapper`}>
      <div className="avater-container">
        {profileImgUrl ? (
          <img alt="" draggable={false} />
        ) : (
          <BsFillPersonFill />
        )}
      </div>
    </div>
  );
};
