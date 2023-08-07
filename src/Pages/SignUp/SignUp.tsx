import { useState } from "react";
import { Button } from "../../Components/UI/Button/Button";
import { Chip } from "../../Components/UI/Chip/Chip";
import { Input } from "../../Components/UI/Input/Input";
import { mainCategories } from "../../ConstAndTypes/consts";
import "./SignUp.scss";

const categoriesNum = 3;

const categories: mainCategories[] = [
  "general",
  "world",
  "nation",
  "business",
  "technology",
  "entertainment",
  "sports",
  "science",
  "health",
];

export const SignUp = () => {
  const [chosenCategories, setChosenCategories] = useState<mainCategories[]>(
    []
  );

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const onClickCategoryHandler = (category: mainCategories) => {
    const tempArr = [...chosenCategories];
    const index = tempArr.indexOf(category);
    if (index > -1) {
      // only splice array when item is found
      tempArr.splice(index, 1); // 2nd parameter means remove one item only
    } else if (tempArr.length < categoriesNum) {
      tempArr.push(category);
    }
    console.log(tempArr);
    setChosenCategories(() => tempArr);
  };

  return (
    <div className="sign-up-wrapper">
      <h1>Sign-Up</h1>
      <form className="form-wrapper" onSubmit={submitHandler}>
        <Input
          value=""
          placeholder="First name"
          type="underline"
          onChange={() => {}}
        />
        <Input
          value=""
          placeholder="Email"
          type="underline"
          onChange={() => {}}
        />
        <Input
          value=""
          placeholder="Password"
          type="underline"
          onChange={() => {}}
        />
        Choose your top {categoriesNum} categories:
        <div className="categories-wrapper">
          {categories.map((category, index) => {
            const active = chosenCategories.includes(category);
            const disabled =
              !active && chosenCategories.length === categoriesNum;
            console.log("disabled", disabled);
            return (
              <Chip
                key={`CAT-${index}`}
                text={category}
                active={active}
                disabled={disabled}
                onClick={() => {
                  onClickCategoryHandler(category);
                }}
              />
            );
          })}
        </div>
        {/* {chosenCategories.map((cat, index) => (
          <div key={"temp-" + index}>{cat}</div>
        ))} */}
        <Button text="Sign-up" type="outline" />
      </form>
    </div>
  );
};
