import { Button } from "components/button";
import { Radio } from "components/checkbox";
import { Field, FieldCheckboxes } from "components/field";
import ImageUpload from "components/image/ImageUpload";
import { Input } from "components/input";
import { Label } from "components/label";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "firebaseApp/configFirebase";
import useFirebaseImg from "hooks/HookFirebaseImg";
import DashboardHeading from "module/Dashboard/DashboardHeading";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { roleUser, statusUser } from "utils/constants";

const UserUpdate = () => {
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
  const imageUrl = getValues("avatar");
  const imageRegex = /%2F(\S+)\?/gm.exec(imageUrl);
  const imageName = imageRegex?.length > 0 ? imageRegex[1] : "";
  const { handleDelImage, image, setImage, progress, handleImage } =
    useFirebaseImg(setValue, getValues, imageName, clearAvatar);
  const [loading, setLoading] = useState(false);
  const [params] = useSearchParams();
  const userId = params.get("id");

  useEffect(() => {
    document.title = "Monkey Blogging - Edit info user";
  }, []);

  useEffect(() => {
    async function fetchData() {
      if (!userId) return null;
      const colRef = doc(db, "users", userId);
      const docData = await getDoc(colRef);
      reset(docData && docData.data());
    }
    fetchData();
  }, [userId, reset]);

  useEffect(() => {
    setImage(imageUrl);
  }, [setImage, imageUrl]);

  const updateUser = async (values) => {
    if (!isValid) return;
    setLoading(true);
    try {
      const colRef = doc(db, "users", userId);
      await updateDoc(colRef, {
        ...values,
        avatar: image,
      });
      toast.success(`Update info user successfully`);
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  async function clearAvatar() {
    const colRef = doc(db, "users", userId);
    await updateDoc(colRef, {
      avatar: "",
    });
  }

  return (
    <>
      <DashboardHeading title="Edit user" desc="Edit info user to system" />
      <form onSubmit={handleSubmit(updateUser)}>
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
          Update user
        </Button>
      </form>
    </>
  );
};

export default UserUpdate;
