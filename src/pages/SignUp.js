import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "components/button";
import { Field } from "components/field";
import { Input } from "components/input";
import InputPassToggle from "components/input/InputPassToggle";
import { Label } from "components/label";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { auth, db } from "firebaseApp/configFirebase";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import slugify from "slugify";
import { roleUser, statusUser } from "utils/constants";
import * as yup from "yup";
import AuthenLayout from "../layout/AuthenLayout";

const schema = yup.object({
  fullname: yup.string().required("Field your fullname not empty !!!"),
  email: yup
    .string()
    .required("Field your email not empty !!!")
    .email("Please enter valid email address"),
  password: yup
    .string()
    .required("Field your password not empty !!!")
    .min(6, "Password must be least 6 characters or more"),
});

const SignUp = () => {
  const navigate = useNavigate();
  const [togglePassword, setTogglePassword] = useState(false);

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
    const arrErroes = Object.values(errors);
    if (arrErroes.length > 0) {
      toast.error(arrErroes[0]?.message, {
        pauseOnHover: false,
      });
    }
  }, [errors]);

  const SignUp = async (values) => {
    if (!isValid) return;
    const user = await createUserWithEmailAndPassword(
      auth,
      values.email,
      values.password
    );
    await updateProfile(auth.currentUser, {
      displayName: values.fullname,
      photoURL: `https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80`,
    });
    // add user info to collection users
    // const colRef = collection(db, "users");
    // set userId === uid
    await setDoc(doc(db, "users", auth.currentUser.uid), {
      fullname: values.fullname,
      email: values.email,
      password: values.password,
      username: slugify(values.fullname, { lower: true }),
      avatar: `https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80`,
      status: statusUser.ACTIVE, // 1(active) 2(pending) 3(ban)
      role: roleUser.USER, // 1(admin) 2(mod) 3(user)
      createdAt: serverTimestamp(),
    });
    // await addDoc(colRef, {}); => auto create uid
    toast.success("Create user successfully");
    navigate("/");
  };

  return (
    <AuthenLayout>
      <form className="form" onSubmit={handleSubmit(SignUp)}>
        <Field>
          <Label className="label" htmlFor="fullname">
            Full name
          </Label>
          <Input
            className="input"
            type="text"
            name="fullname"
            id="fullname"
            placeholder="Please enter your fullname...."
            control={control}
          />
        </Field>
        <Field>
          <Label className="label" htmlFor="password">
            Password
          </Label>
          <InputPassToggle control={control}></InputPassToggle>
        </Field>
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
        <div className="is__account">
          <span>You already have an account?</span>
          <NavLink to={"/signin"}>Login</NavLink>
        </div>
        <Button
          type="submit"
          isLoading={isSubmitting}
          disabled={isSubmitting}
          style={{ maxWidth: 300, margin: "0 auto" }}
          colorMain={"primary"}
        >
          Sign Up
        </Button>
      </form>
    </AuthenLayout>
  );
};

export default SignUp;
