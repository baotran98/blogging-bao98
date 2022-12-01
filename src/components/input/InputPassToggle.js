import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment, useState } from "react";
import Input from "./Input";

const InputPassToggle = ({ control }) => {
  const [togglePassword, setTogglePassword] = useState(false);
  return (
    <Fragment>
      <Input
        className="input"
        type={togglePassword ? "text" : "password"}
        name="password"
        id="password"
        placeholder="Please enter your password...."
        control={control}
      >
        {!togglePassword ? (
          <FontAwesomeIcon
            className="icon-style"
            icon={faEyeSlash}
            onClick={() => setTogglePassword(true)}
          />
        ) : (
          <FontAwesomeIcon
            className="icon-style"
            icon={faEye}
            onClick={() => setTogglePassword(false)}
          />
        )}
      </Input>
    </Fragment>
  );
};

export default InputPassToggle;
