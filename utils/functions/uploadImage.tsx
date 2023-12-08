import { storage } from "@/firbase";
import { useFetch } from "@/utils/hooks/useFetch";
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytesResumable,
} from "firebase/storage";
import { useState } from "react";
export default function useUploadImage(imageData: File) {
  let [imageUrl, setImageUrl] = useState<string>("");
  let [loading, setLoading] = useState<boolean>(false);
  let { data, error, fetchData } = useFetch({
    url: "/api/v1/auth/update/",
    method: "put",
    body: {
      avatar: imageUrl,
    },
    withCredentials: true,
    withToken: true,
  });
  async function uploadImage() {
    const image = storageRef(storage, `images/${imageData.name}`);
    let upload = uploadBytesResumable(image, imageData);
    upload.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setLoading(true);
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(upload.snapshot.ref).then(async (downloadURL) => {
          setImageUrl(downloadURL);
          setLoading(false);
          await fetchData({ avatar: downloadURL });
        });
      }
    );
  }
  return { uploadImage, loading, error };
}
