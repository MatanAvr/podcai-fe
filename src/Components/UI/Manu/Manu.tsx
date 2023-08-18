import { IconButton } from "../IconButton/IconButton";
import "./Manu.scss";
import { BiCategory, BiNews } from "react-icons/bi";
import { BsFillPersonFill } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";

interface manuProps {
  isOpen: boolean;
}

export const Manu = ({ isOpen }: manuProps) => {
  return (
    <div className={`manu-wrapper ${isOpen ? "open" : ""}`}>
      <div className="manu-container">
        <IconButton onClick={() => {}}>
          <>
            <BiCategory size={25} />
            Categories
          </>
        </IconButton>

        <IconButton onClick={() => {}}>
          <>
            <BsFillPersonFill size={25} />
            Podcasters
          </>
        </IconButton>

        <IconButton onClick={() => {}}>
          <>
            <BiNews size={25} />
            Articles
          </>
        </IconButton>

        <IconButton onClick={() => {}}>
          <>
            <FiSettings size={25} />
            Settings
          </>
        </IconButton>
      </div>
    </div>
  );
};
