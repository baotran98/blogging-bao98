import { Button } from "components/button";
import { Radio } from "components/checkbox";
import { Field, FieldCheckboxes } from "components/field";
import ImageUpload from "components/image/ImageUpload";
import { Input } from "components/input";
import { Label } from "components/label";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db } from "firebaseApp/configFirebase";
import useFirebaseImg from "hooks/HookFirebaseImg";
import DashboardHeading from "module/Dashboard/DashboardHeading";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import slugify from "slugify";
import { roleUser, statusUser } from "utils/constants";

const UserAddNew = () => {
  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    getValues,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      fullname: "",
      username: "",
      email: "",
      password: "",
      status: statusUser.ACTIVE,
      role: roleUser.USER,
      createdAt: new Date(),
      avatar: "",
    },
  });

  const watchStatus = watch("status");
  const watchRole = watch("role");
  const [loading, setLoading] = useState(false);
  const { handleDelImage, image, handleResetUpload, progress, handleImage } =
    useFirebaseImg(setValue, getValues);

  useEffect(() => {
    document.title = "Monkey Blogging - Add new user";
  }, []);

  const AddUser = async (values) => {
    if (!isValid) return;
    setLoading(true);
    try {
      const colRef = collection(db, "users");
      await createUserWithEmailAndPassword(auth, values.email, values.password);
      await addDoc(colRef, {
        fullname: values.fullname,
        username: slugify(values.username || values.fullname, {
          lower: true,
          replacement: " ",
          trim: true,
        }),
        email: values.email,
        password: values.password,
        status: Number(values.status),
        role: Number(values.role),
        avatar: image,
        createdAt: serverTimestamp(),
      });
      toast.success(`Create user ${values.email} successfully`);
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
      console.log(error);
    } finally {
      setLoading(false);
      handleResetUpload();
      reset({
        fullname: "",
        username: "",
        email: "",
        password: "",
        status: statusUser.ACTIVE,
        role: roleUser.USER,
        avatar: "",
      });
    }
  };

  return (
    <>
      <DashboardHeading title="New user" desc="Add new user to system" />
      <form onSubmit={handleSubmit(AddUser)}>
        <div className="w-[200px] h-[200px]  mx-auto mb-8">
          <ImageUpload
            className="w-full h-full !rounded-full text-[14px]"
            onChange={handleImage}
            progress={progress}
            image={image}
            handleDelImage={handleDelImage}
          />
        </div>
        <div className="form-layout">
          <Field>
            <Label htmlFor="fullname">Fullname</Label>
            <Input
              type="text"
              className="input"
              name="fullname"
              id="fullname"
              placeholder="Enter your fullname"
              control={control}
            ></Input>
          </Field>
          <Field>
            <Label htmlFor="username">Username</Label>
            <Input
              type="text"
              className="input"
              name="username"
              id="username"
              placeholder="Enter your username"
              control={control}
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              className="input"
              name="email"
              id="email"
              placeholder="Enter your email"
              control={control}
            ></Input>
          </Field>
          <Field>
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              className="input"
              name="password"
              id="password"
              placeholder="Enter your password"
              control={control}
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Status</Label>
            <FieldCheckboxes>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === statusUser.ACTIVE}
                value={statusUser.ACTIVE}
              >
                Active
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === statusUser.PENDING}
                value={statusUser.PENDING}
              >
                Pending
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === statusUser.BAN}
                value={statusUser.BAN}
              >
                Banned
              </Radio>
            </FieldCheckboxes>
          </Field>
          <Field>
            <Label>Role</Label>
            <FieldCheckboxes>
              <Radio
                name="role"
                control={control}
                checked={Number(watchRole) === roleUser.ADMIN}
                value={roleUser.ADMIN}
              >
                Admin
              </Radio>
              <Radio
                name="role"
                control={control}
                checked={Number(watchRole) === roleUser.MOD}
                value={roleUser.MOD}
              >
                Moderator
              </Radio>
              <Radio
                name="role"
                control={control}
                checked={Number(watchRole) === roleUser.USER}
                value={roleUser.USER}
              >
                User
              </Radio>
            </FieldCheckboxes>
          </Field>
        </div>
        <Button
          type="submit"
          colorMain="primary"
          className="mx-auto max-w-[200px]"
          isLoading={loading}
          disabled={loading}
        >
          Add user
        </Button>
      </form>
    </>
  );
};

export default UserAddNew;
