import { Button } from "components/button";
import { Radio } from "components/checkbox";
import { Field, FieldCheckboxes } from "components/field";
import { Input } from "components/input";
import { Label } from "components/label";
import { useAuth } from "contexts/authContext";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "firebaseApp/configFirebase";
import DashboardHeading from "module/Dashboard/DashboardHeading";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import slugify from "slugify";
import { statusCate } from "utils/constants";

const CategoryAddNew = () => {
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
  const watchStatus = watch("status");
  const [loading, setLoading] = useState(false);
  const { userInfo } = useAuth();

  useEffect(() => {
    document.title = "Monkey Blogging - Add new category";
  }, []);

  const AddCategory = async (values) => {
    if (!isValid) return;
    setLoading(true);
    try {
      const cloneValues = { ...values };
      cloneValues.slug = slugify(values.slug || values.name, { lower: true });
      cloneValues.status = Number(values.status);
      const colRef = collection(db, "categories");
      await addDoc(colRef, {
        ...cloneValues,
        userId: userInfo.uid,
        createdAt: serverTimestamp(),
      });
      toast.success("Create new category successfully");
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
      console.log(error);
    } finally {
      setLoading(false);
      reset({
        name: "",
        slug: "",
        status: 1,
      });
    }
  };

  return (
    <div>
      <DashboardHeading title="New category" desc="Add new category" />
      <form onSubmit={handleSubmit(AddCategory)}>
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
          className="mx-auto max-w-[200px]"
          isLoading={loading}
          disabled={loading}
        >
          Add new category
        </Button>
      </form>
    </div>
  );
};

export default CategoryAddNew;
