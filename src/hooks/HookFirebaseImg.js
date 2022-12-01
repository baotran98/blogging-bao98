import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useState } from "react";

export default function useFirebaseImg(
  setValue,
  getValues,
  imageName = null,
  callBack = null
) {
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState("");
  // check input values(react hook form)
  if (!setValue || !getValues) return;
  const uploadImage = (file) => {
    const storage = getStorage();
    // const metadata = {
    //   contentType: "image/jpeg",
    // };
    const storageRef = ref(storage, "images/" + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progressPer =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progressPer);
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            console.log("Empty file");
        }
      },
      (error) => {
        console.log("Fail", error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setImage(downloadURL);
        });
      }
    );
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setValue("image_name", file.name);
    uploadImage(file);
  };

  const handleDelImage = () => {
    const storage = getStorage();
    const imageRef = ref(
      storage,
      "images/" + (imageName || getValues("image_name"))
    );
    deleteObject(imageRef)
      .then(() => {
        console.log("Remove image successfully");
        setImage("");
        setProgress(0);
        callBack && callBack();
      })
      .catch((error) => {
        console.log(error);
        console.log("Remove image fail");
      });
  };

  const handleResetUpload = () => {
    setImage("");
    setProgress(0);
  };

  return {
    handleImage,
    handleDelImage,
    handleResetUpload,
    progress,
    image,
    setImage,
  };
}
