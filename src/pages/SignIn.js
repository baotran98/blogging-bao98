import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "components/button";
import { Field } from "components/field";
import { Input } from "components/input";
import InputPassToggle from "components/input/InputPassToggle";
import { Label } from "components/label";
import { useAuth } from "contexts/authContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "firebaseApp/configFirebase";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import AuthenLayout from "../layout/AuthenLayout";

const schema = yup.object({
  email: yup
    .string()
    .required("Field your email not empty !!!")
    .email("Please enter valid email address"),
  password: yup
    .string()
    .required("Field your password not empty !!!")
    .min(6, "Password must be least 6 characters or more"),
});

const SignIn = () => {
  const [togglePassword, setTogglePassword] = useState(false);
  const navigate = useNavigate();
  const { userInfo } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    watch,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    document.title = "Login Page";
    if (!userInfo?.email) {
      navigate("/signin");
    } else {
      navigate("/");
    }
    const arrErroes = Object.values(errors);
    if (arrErroes.length > 0) {
      toast.error(arrErroes[0]?.message, {
        pauseOnHover: false,
      });
    }
  }, [errors]);

  const SignIn = async (values) => {
    if (!isValid) return;
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      toast.success("Login successfully");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Login fail");
    }
  };

  return (
    <AuthenLayout>
      <form className="form" onSubmit={handleSubmit(SignIn)}>
        <Field>
          <Label className="label" htmlFor="email">
            Email address
          </Label>
          <Input
            className="input"
            type="email"
            name="email"
            id="email"
            placeholder="Please enter your email address...."
            control={control}
          />
        </Field>
        <Field>
          <Label className="label" htmlFor="password">
            Password
          </Label>
          <InputPassToggle control={control}></InputPassToggle>
        </Field>
        <div className="is__account">
          <span>Don't have an account?</span>
          <NavLink to={"/signup"}>Register</NavLink>
        </div>
        <Button
          type="submit"
          isLoading={isSubmitting}
          disabled={isSubmitting}
          style={{ maxWidth: 300, margin: "0 auto" }}
          colorMain={"primary"}
        >
          Sign In
        </Button>
      </form>
    </AuthenLayout>
  );
};

export default SignIn;
