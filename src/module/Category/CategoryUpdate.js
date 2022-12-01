import { Button } from "components/button";
import { Radio } from "components/checkbox";
import { Field, FieldCheckboxes } from "components/field";
import { Input } from "components/input";
import { Label } from "components/label";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "firebaseApp/configFirebase";
import DashboardHeading from "module/Dashboard/DashboardHeading";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import slugify from "slugify";
import { statusCate } from "utils/constants";

const CategoryUpdate = () => {
  const {
    control,
    setValue,
    watch,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      slug: "",
      status: 1,
      createdAt: new Date(),
    },
  });
  const [params] = useSearchParams();
  const watchStatus = watch("status");
  const categoryId = params.get("id");
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Monkey Blogging - Update category";
  }, []);

  useEffect(() => {
    async function fetchData() {
      const colRef = doc(db, "categories", categoryId);
      const singleDoc = await getDoc(colRef);
      reset(singleDoc.data());
      console.log(singleDoc.data());
    }
    fetchData();
  }, [categoryId, reset]);

  const UpdateCategory = async (values) => {
    try {
      const colRef = doc(db, "categories", categoryId);
      await updateDoc(colRef, {
        name: values.name,
        slug: slugify(values.slug || values.name, { lower: true }),
        status: Number(values.status),
      });
      toast.success("Update category succesfully");
      navigate("/manage/category");
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (!categoryId) return null;

  return (
    <>
      <DashboardHeading
        title="Update category"
        desc={`Update your category id: ${categoryId}`}
      />
      <form onSubmit={handleSubmit(UpdateCategory)}>
        <div className="form-layout">
          <Field>
            <Label htmlFor="name">Name</Label>
            <Input
              control={control}
              name="name"
              id="name"
              type="text"
              className="input"
              placeholder="Enter your category title"
            ></Input>
          </Field>
          <Field>
            <Label htmlFor="slug">Slug</Label>
            <Input
              control={control}
              name="slug"
              id="slug"
              type="text"
              className="input"
              placeholder="Enter your slug"
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <FieldCheckboxes>
            <Label>Status</Label>
            <div className="flex flex-wrap gap-x-5">
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === statusCate.APPROVED}
                value={statusCate.APPROVED}
              >
                Approved
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === statusCate.UNAPPROVED}
                value={statusCate.UNAPPROVED}
              >
                Unapproved
              </Radio>
            </div>
          </FieldCheckboxes>
        </div>
        <Button
          type="submit"
          colorMain="primary"
          className="mx-auto max-w-[250px]"
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          Update category
        </Button>
      </form>
    </>
  );
};

export default CategoryUpdate;
