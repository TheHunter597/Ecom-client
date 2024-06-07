import AuthContainer from "@/app/auth/components/container";
import Input from "../../components/input";
import { useAppSelector } from "@/redux/reduxHooks";
import { useFetch } from "@/utils/hooks/useFetch";
import { useEffect, useState } from "react";
import {
  setUserAddress,
  setUserCity,
  setUserCountry,
  setUserFirstName,
  setUserLastName,
  setUserState,
  setZipCode,
  setPhoneNumber,
} from "@/redux/auth/userCreation";
import ChooseFromOverlay from "../../components/ChooseFromOverlay";
import countriesData from "@/public/data/allCountries.json";
import ReactLoading from "react-loading";
import Image from "next/image";
import rightArrow from "@/public/assets/arrows/rightArrow.svg";

export default function ChangeProfileData({
  buttonText,
  actionAfterSubmit,
}: {
  buttonText: string;
  actionAfterSubmit: Function;
}) {
  let [currentActiveInput, setCurrentActiveInput] = useState(null);

  let {
    first_name,
    last_name,
    address,
    city,
    state,
    zip_code,
    phone_number,
    country,
  } = useAppSelector((state) => state.userCreation);

  //////////////
  let { data, loading, error, fetchData } = useFetch({
    url: "/api/v1/auth/update/",
    method: "put",
    body: {
      first_name,
      last_name,
      address,
      city,
      state,
      country,
      zip_code,
      phone_number,
    },
    withCredentials: true,
    withToken: true,
  });
  return (
    <form
      className="py-2  flex flex-col gap-5"
      onSubmit={async (e) => {
        e.preventDefault();
        let result = await fetchData();
        if (result) {
          actionAfterSubmit();
        }
      }}
    >
      <div className="flex flex-row gap-3">
        <Input
          placeholder="First Name"
          name="first name"
          type="text"
          value={first_name}
          changeFunc={setUserFirstName}
          currentActiveInput={currentActiveInput}
          setCurrentActiveInput={setCurrentActiveInput}
          error={error?.errors?.first_name}
        />
        <Input
          placeholder="Last Name"
          name="last name"
          type="text"
          value={last_name}
          changeFunc={setUserLastName}
          currentActiveInput={currentActiveInput}
          setCurrentActiveInput={setCurrentActiveInput}
          error={error?.errors?.last_name}
        />
      </div>
      <Input
        placeholder="Address"
        name="address"
        type="text"
        value={address}
        changeFunc={setUserAddress}
        currentActiveInput={currentActiveInput}
        setCurrentActiveInput={setCurrentActiveInput}
      />
      <Input
        placeholder="Phone number"
        name="Phone number"
        type="text"
        value={phone_number}
        changeFunc={setPhoneNumber}
        currentActiveInput={currentActiveInput}
        setCurrentActiveInput={setCurrentActiveInput}
      />
      <div className="flex flex-row gap-3">
        <Input
          placeholder="City"
          name="city"
          type="text"
          value={city}
          changeFunc={setUserCity}
          currentActiveInput={currentActiveInput}
          setCurrentActiveInput={setCurrentActiveInput}
        />
        <Input
          placeholder="State"
          name="state"
          type="text"
          value={state}
          changeFunc={setUserState}
          currentActiveInput={currentActiveInput}
          setCurrentActiveInput={setCurrentActiveInput}
        />
      </div>
      <div className="flex flex-row gap-3 justify-between">
        <ChooseFromOverlay
          changeCurrentActive={setUserCountry}
          currentActive={country}
          list={countriesData}
          text="Country"
        />
        <Input
          placeholder="Zip code"
          name="zip code"
          type="text"
          value={zip_code}
          changeFunc={setZipCode}
          currentActiveInput={currentActiveInput}
          setCurrentActiveInput={setCurrentActiveInput}
        />
      </div>
      {loading ? (
        <div className="flex flex-row justify-center">
          <ReactLoading type="bubbles" width={50} height={40} color="#101B42" />
        </div>
      ) : (
        <button
          className="py-2 main-yellow-background-color primary-color text-2sb w-full
            flex flex-row gap-2 items-center justify-center rounded-md font-bold"
        >
          {buttonText ? (
            buttonText
          ) : (
            <>
              Next
              <Image src={rightArrow} alt="right arrow" />
            </>
          )}
        </button>
      )}
      <small className="w-full text-green-300 text-4sb text-center">
        {data ? data.message : ""}
      </small>
    </form>
  );
}
