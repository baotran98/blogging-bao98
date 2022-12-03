import axios from "axios";
import { Button } from "components/button";
import { Radio } from "components/checkbox";
import { Dropdown } from "components/dropdown";
import { Field, FieldCheckboxes } from "components/field";
import ImageUpload from "components/image/ImageUpload";
import { Input } from "components/input";
import { Label } from "components/label";
import Toggle from "components/toggle/Toggle";
import { useAuth } from "contexts/authContext";
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
import useFirebaseImg from "hooks/HookFirebaseImg";
import ImageUploader from "quill-image-uploader";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import slugify from "slugify";
import styled from "styled-components";
import { statusPost } from "utils/constants";

Quill.register("modules/imageUploader", ImageUploader);

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
  const { handleDelImage, image, handleResetUpload, progress, handleImage } =
    useFirebaseImg(setValue, getValues);
  const [categories, setCategories] = useState([]);
  const [selectCategory, setSelectCategory] = useState("");
  const [content, setContent] = useState("");
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
      const colRef = collection(db, "posts");
      await addDoc(colRef, {
        ...cloneValues,
        image,
        content,
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
    const colRef = doc(db, "categories", cate.id);
    const docData = await getDoc(colRef);
    setValue("category", {
      id: docData.id,
      ...docData.data(),
    });
    setSelectCategory(cate);
  };

  const modules = useMemo(
    () => ({
      toolbar: [
        ["bold", "italic", "underline", "strike"],
        ["blockquote"],
        [{ header: 1 }, { header: 2 }], // custom button values
        [{ list: "ordered" }, { list: "bullet" }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["link", "image"],
      ],
      imageUploader: {
        upload: async (file) => {
          const bodyFormData = new FormData();
          bodyFormData.append("image", file);
          const response = await axios({
            method: "POST",
            url: "https://api.imgbb.com/1/upload?key=038d6e6c84db1357a62ddf6cc55b0721",
            data: bodyFormData,
            headers: {
              "Content-type": "multipart/form-data",
            },
          });
          return response.data.data.url;
        },
      },
    }),
    []
  );

  return (
    <PostAddNewStyles>
      <h1 className="dashboard-heading">Add new post</h1>
      <form onSubmit={handleSubmit(addPost)}>
        <div className="grid mb-10 lg:grid-cols-2 gap-x-10">
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
        <div className="grid mb-10 lg:grid-cols-2 gap-x-10">
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
        <div className="grid mb-10 lg:grid-cols-2 gap-x-10">
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
        <div className="flex flex-col mb-16 gap-y-5">
          <Field>
            <Label htmlFor="content">Content</Label>
            <ReactQuill
              className="max-h-fit entry-content quill"
              theme="snow"
              value={content}
              onChange={setContent}
              modules={modules}
            />
          </Field>
          <FieldCheckboxes>
            <Label htmlFor="hot">Hot</Label>
            <Toggle
              on={watchHot === true}
              onClick={() => setValue("hot", !watchHot)}
            />
          </FieldCheckboxes>
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
