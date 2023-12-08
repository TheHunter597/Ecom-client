import AuthContainer from "../../components/container";

import { useState } from "react";
import avatarHolder from "@/public/assets/nav/avatarHolder.svg";
import Image from "next/image";
import useUploadImage from "@/utils/functions/uploadImage";
import ReactLoading from "react-loading";
export default function FifthStep({
  changeCurrentStep,
}: {
  changeCurrentStep: Function;
}) {
  let [image, setImage] = useState<any>(null);
  let [displayImage, setDisplayImage] = useState(avatarHolder);
  let { uploadImage, loading, error } = useUploadImage(image);

  return (
    <div className="pt-20 flex flex-col items-center gap-10 primary-color">
      <h2 className="flex flex-col gap-2 items-center">
        <span className="text-3sb">step 4 of 4</span>
        <span className="header-6sb">Upload avatar</span>
      </h2>
      <AuthContainer>
        <div className="py-10 flex flex-col gap-10 items-center justify-center">
          <form
            className="flex flex-col gap-20 w-full items-center justify-center"
            onSubmit={async (e) => {
              e.preventDefault();
              await uploadImage();
              changeCurrentStep((prev: number) => prev + 1);
            }}
          >
            <div className="flex flex-col gap-12 items-center">
              <div className="flex flex-col gap-2 items-center primary-color">
                <Image
                  src={displayImage}
                  alt="avatar-holder"
                  className="self-center"
                />
                <small className="text-3r flex flex-col gap-1 items-center">
                  <span>Image uploaded: </span>
                  <span className="text-3sb">{image ? image.name : ""}</span>
                </small>
              </div>
              <div className="relative">
                <label
                  htmlFor="upload-photo"
                  className="cursor-pointer primary-color text-3sb border-2 rounded-lg
                  py-2 px-8 border-gray-900
                  "
                >
                  Upload avatar
                </label>
                <input
                  type="file"
                  name="photo"
                  id="upload-photo"
                  className="opacity-0 absolute -z-1"
                  onChange={(e) => {
                    let file = e.target.files;
                    if (file && file[0]) {
                      setImage(file[0]);
                    }
                  }}
                />
              </div>
            </div>
            {loading ? (
              <div className="flex flex-row justify-center">
                <ReactLoading
                  type="bubbles"
                  width={50}
                  height={40}
                  color="#101B42"
                />
              </div>
            ) : (
              <button
                className="py-2 main-yellow-background-color primary-color text-2sb w-11/12 md:w-8/12 
            flex flex-row gap-2 items-center justify-center rounded-md font-bold"
              >
                Finish my account
              </button>
            )}
          </form>
          <button className="primary-color">pass</button>
        </div>
      </AuthContainer>
    </div>
  );
}
