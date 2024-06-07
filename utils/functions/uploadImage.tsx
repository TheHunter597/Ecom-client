import { randomBytes } from "crypto";
import { storage } from "@/firbase";
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytesResumable,
} from "firebase/storage";
import { useState } from "react";
function base64ToBinary(base64: string) {
  var raw = atob(base64);
  var rawLength = raw.length;
  var array = new Uint8Array(new ArrayBuffer(rawLength));

  for (let i = 0; i < rawLength; i++) {
    array[i] = raw.charCodeAt(i);
  }
  return array;
}

export default function useUploadImage() {
  let [imageUrl, setImageUrl] = useState<string>("");
  let [loading, setLoading] = useState<boolean>(false);

  async function uploadImage(imageData: { image: string } | File) {
    const image = storageRef(
      storage,
      `images/${randomBytes(18).toString("hex")}`
    );

    let upload: any;
    if (imageData instanceof File) {
      upload = uploadBytesResumable(image, imageData);
    } else {
      upload = uploadBytesResumable(image, base64ToBinary(imageData.image));
    }
    upload.on(
      "state_changed",
      (snapshot: any) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setLoading(true);
      },
      (error: any) => {
        console.log(error);
      },
      () => {
        getDownloadURL(upload.snapshot.ref).then(async (uri) => {
          setImageUrl(uri);
          setLoading(false);
        });
      }
    );
  }
  return { uploadImage, loading, imageUrl };
}
