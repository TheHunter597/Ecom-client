import useUploadImage from "@/utils/functions/uploadImage";
import { useFetch } from "@/utils/hooks/useFetch";
import Image from "next/image";
import { useEffect, useState } from "react";
import "./CreateProduct.scss";
import { motion, AnimatePresence } from "framer-motion";
import ReactLoading from "react-loading";
import { useDispatch } from "react-redux";
import {
  selectCreateProduct,
  setProductImage,
} from "@/redux/products/productsSlice";
import { useAppSelector } from "@/redux/reduxHooks";
import {
  selectEditProduct,
  setEditProductImage,
} from "@/redux/products/editProductSlice";

export default function CreateProductImage({
  state,
}: {
  state: "edit" | "create";
}) {
  const [removeBg, setRemoveBg] = useState<boolean>(false);
  const [removeBgHovered, setRemoveBgHovered] = useState<boolean>(false);
  const formData = new FormData();
  const {
    data,
    fetchData,
    error,
    loading: otherLoading,
  } = useFetch({
    url: "/api/v1/images/",
    method: "post",
    body: formData,
  });
  const { uploadImage, loading, imageUrl } = useUploadImage();
  const dispatch = useDispatch();
  async function removeImageBackground(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    const file = e.target.files[0];
    formData.append("file", file);
    await fetchData();
  }
  const { image } = useAppSelector(
    state == "edit" ? selectEditProduct : selectCreateProduct
  );
  useEffect(() => {
    dispatch(
      state === "edit"
        ? setEditProductImage(imageUrl)
        : setProductImage(imageUrl)
    );
  }, [imageUrl]);
  useEffect(() => {
    if (data && removeBg) {
      uploadImage(data);
    }
  }, [data]);
  return (
    <div className="w-full relative h-fit col-start-1 col-end-7 sm:sticky sm:top-24 border-2 rounded-sm border-gray-700">
      <Image
        alt="PlaceHolder image"
        src={image || "/images/ImagePlaceHolder.png"}
        width={0}
        height={0}
        sizes="100vw"
        className="-z-10  CreateProductImage"
      />
      <div
        className={`RemoveBackgroundImage ${
          removeBg ? "RemoveBackgroundImage--active" : ""
        }`}
        onClick={() => {
          setRemoveBg((prev) => !prev);
        }}
        onMouseEnter={() => setRemoveBgHovered(true)}
        onMouseLeave={() => setRemoveBgHovered(false)}
      >
        <span>
          <Image
            width={24}
            height={24}
            src={
              removeBg
                ? "/assets/products/correct.svg"
                : "/assets/products/decline.svg"
            }
            alt="choice"
          />
        </span>
        <AnimatePresence>
          {removeBgHovered && (
            <motion.div
              className="absolute top-full mt-2 p-3 text-4sb text-white font-bold
                bg-red-400 rounded-md w-36
                "
              key={"removeImageBackgroundLayout"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <p>
                Remove the backgound of the image check this and then upload the
                image
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="absolute z-10 bottom-10 left-1/2 -translate-x-1/4">
        {loading || otherLoading ? (
          <ReactLoading
            type="bubbles"
            width={100}
            height={100}
            color="#101B42"
          />
        ) : (
          <label
            htmlFor="upload-photo"
            className="text-white text-3sb font-bold px-8 py-2 rounded-sm primary-background-color cursor-pointer
                "
          >
            {!imageUrl ? "Upload Image" : "Change Image"}
          </label>
        )}
        <input
          type="file"
          name="photo"
          id="upload-photo"
          className="opacity-0 -z-1 bottom-10"
          onChange={async (e) => {
            if (removeBg) {
              await removeImageBackground(e);
            } else {
              if (e.target.files && e.target.files[0]) {
                await uploadImage(e.target.files[0]);
              }
            }
          }}
        />
      </div>
    </div>
  );
}
