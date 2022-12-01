import { Button } from "components/button";
import { Radio } from "components/checkbox";
import { Dropdown } from "components/dropdown";
import { Field, FieldCheckboxes } from "components/field";
import { Input } from "components/input";
import { Label } from "components/label";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import slugify from "slugify";
import styled from "styled-components";
import { statusPost } from "utils/constants";
import ImageUpload from "components/image/ImageUpload";
import useFirebaseImg from "hooks/HookFirebaseImg";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { db } from "firebaseApp/configFirebase";
import Toggle from "components/toggle/Toggle";
import { useAuth } from "contexts/authContext";
import { toast } from "react-toastify";

const PostAddNewStyles = styled.div``;

const PostAddNew = () => {
  const { control, watch, setValue, handleSubmit, getValues, reset } = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      slug: "",
      status: 2,
      category: {},
      hot: false,
      image: "",
      user: {},
    },
  });
  const watchStatus = watch("status");
  const watchHot = watch("hot");
  // const watchCategory = watch("category");
  const { handleDelImage, image, handleResetUpload, progress, handleImage } =
    useFirebaseImg(setValue, getValues);
  const [categories, setCategories] = useState([]);
  const [selectCategory, setSelectCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const { userInfo } = useAuth();

  useEffect(() => {
    document.title = "Monkey Blogging - Add new post";
  }, []);

  useEffect(() => {
    async function fetchUserData() {
      if (!userInfo.email) return;
      const q = query(
        collection(db, "users"),
        where("email", "==", userInfo.email)
      );
      const querySnapShot = await getDocs(q);
      querySnapShot.forEach((doc) => {
        setValue("user", {
          id: doc.id,
          ...doc.data(),
        });
      });
    }
    fetchUserData();
  }, [userInfo.email, setValue]);

  useEffect(() => {
    async function getData() {
      const colRef = collection(db, "categories");
      const q = query(colRef, where("status", "==", 1));
      const querySnapShot = await getDocs(q);
      let result = [];
      querySnapShot.forEach((doc) => {
        result.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setCategories(result);
    }
    getData();
  }, []);

  const addPost = async (values) => {
    setLoading(true);
    try {
      const cloneValues = { ...values };
      cloneValues.slug = slugify(values.slug || values.title, { lower: true }); // convert từ field title hoặc field slug
      cloneValues.status = Number(values.status);
      console.log(cloneValues);
      const colRef = collection(db, "posts");
      await addDoc(colRef, {
        ...cloneValues,
        image,
        createdAt: serverTimestamp(),
      });
      toast.success("Create new post succesfully");
    } catch (error) {
      setLoading(false);
      console.log(error);
    } finally {
      setLoading(false);
      reset({
        title: "",
        slug: "",
        status: 2,
        category: {},
        hot: false,
        image: "",
        user: {},
      });
      handleResetUpload();
      setSelectCategory({});
    }
  };

  const handleSelectCate = async (cate) => {
    // setValue("categoryId", cate.id);
    const colRef = doc(db, "categories", cate.id);
    const docData = await getDoc(colRef);
    setValue("category", {
      id: docData.id,
      ...docData.data(),
    });
    setSelectCategory(cate);
  };

  return (
    <PostAddNewStyles>
      <h1 className="dashboard-heading">Add new post</h1>
      <form onSubmit={handleSubmit(addPost)}>
        <div className="grid grid-cols-2 mb-10 gap-x-10">
          <Field>
            <Label htmlFor="title">Title</Label>
            <Input
              className="input"
              type="text"
              name="title"
              id="title"
              control={control}
              placeholder="Enter your title"
            ></Input>
          </Field>
          <Field>
            <Label htmlFor="slug">Slug</Label>
            <Input
              className="input"
              type="text"
              id="slug"
              name="slug"
              control={control}
              placeholder="Enter your slug"
            ></Input>
          </Field>
        </div>
        <div className="grid grid-cols-2 mb-10 gap-x-10">
          <Field>
            <Label>Status</Label>
            <div className="flex items-center gap-x-5">
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === statusPost.APPROVED}
                onClick={() => setValue("status", "approved")}
                value={statusPost.APPROVED}
              >
                Approved
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === statusPost.PENDING}
                onClick={() => setValue("status", "pending")}
                value={statusPost.PENDING}
              >
                Pending
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === statusPost.REJECT}
                onClick={() => setValue("status", "reject")}
                value={statusPost.REJECT}
              >
                Reject
              </Radio>
            </div>
          </Field>
          <Field>
            <Label htmlFor="author">Author</Label>
            <Input
              className="input"
              type="text"
              name="author"
              id="author"
              control={control}
              placeholder="Find the author"
            />
          </Field>
        </div>
        <div className="grid grid-cols-2 mb-10 gap-x-10">
          <FieldCheckboxes>
            <Label htmlFor="hot">Hot</Label>
            <Toggle
              on={watchHot === true}
              onClick={() => setValue("hot", !watchHot)}
            ></Toggle>
          </FieldCheckboxes>
          <Field>
            <Label htmlFor="category">Category</Label>
            <Dropdown id="category">
              <Dropdown.Select placeholder="Select the category"></Dropdown.Select>
              <Dropdown.List>
                {categories.length > 0 &&
                  categories.map((cate) => (
                    <Dropdown.Option
                      key={cate.id}
                      onClick={() => handleSelectCate(cate)}
                    >
                      {cate.name}
                    </Dropdown.Option>
                  ))}
              </Dropdown.List>
            </Dropdown>
            {selectCategory?.name && (
              <span className="p-3 my-3 inline-block font-bold rounded-lg shadow-md max-w-fit bg-slate-200 text-[#00a7b4]">
                {selectCategory?.name}
              </span>
            )}
          </Field>
          <Field>
            <Label htmlFor="image">Image</Label>
            <ImageUpload
              onChange={handleImage}
              progress={progress}
              image={image}
              handleDelImage={handleDelImage}
            />
          </Field>
        </div>
        <Button
          colorMain="primary"
          type="submit"
          className="mx-auto max-w-[250px]"
          isLoading={loading}
          disabled={loading}
        >
          Add post
        </Button>
      </form>
    </PostAddNewStyles>
  );
};

export default PostAddNew;
