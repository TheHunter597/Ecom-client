import AuthContainer from "../../components/container";

import Input from "../components/input";
import rightArrow from "@/public/assets/arrows/rightArrow.svg";
import Image from "next/image";
import {
  setUserAddress,
  setUserCity,
  setUserCountry,
  setUserFirstName,
  setUserLastName,
  setUserState,
} from "@/redux/userCreation";
import { useAppSelector } from "@/redux/reduxHooks";
import { useState } from "react";
import { useFetch } from "@/utils/hooks/useFetch";
import ReactLoading from "react-loading";
import CountriesOverlay from "../components/countriesOverlay";

export default function StepThree({
  changeCurrentStep,
}: {
  changeCurrentStep: Function;
}) {
  let [currentActiveInput, setCurrentActiveInput] = useState(null);
  //////////////
  let firstNameValue = useAppSelector((state) => state.userCreation.first_name);
  let lastNameValue = useAppSelector((state) => state.userCreation.last_name);
  let addressValue = useAppSelector((state) => state.userCreation.address);
  let cityValue = useAppSelector((state) => state.userCreation.city);
  let stateValue = useAppSelector((state) => state.userCreation.state);
  let countryValue = useAppSelector((state) => state.userCreation.country);
  //////////////
  let { data, loading, error, fetchData } = useFetch({
    url: "/api/v1/auth/update/",
    method: "put",
    body: {
      first_name: firstNameValue,
      last_name: lastNameValue,
      address: addressValue,
      city: cityValue,
      state: stateValue,
      country: countryValue,
    },
    withCredentials: true,
    withToken: true,
  });
  //////////////

  return (
    <div className="pt-20 flex flex-col items-center gap-10 primary-color">
      <h2 className="flex flex-col gap-2 items-center">
        <span className="text-3sb">step 2 of 4</span>
        <span className="header-6sb">Personal informations</span>
      </h2>
      <AuthContainer>
        <form
          className="py-2  flex flex-col gap-5"
          onSubmit={async (e) => {
            e.preventDefault();
            let result = await fetchData();
            if (result) {
              changeCurrentStep((prev: number) => prev + 1);
            }
          }}
        >
          <Input
            placeholder="First Name"
            name="first name"
            type="text"
            value={firstNameValue}
            changeFunc={setUserFirstName}
            currentActiveInput={currentActiveInput}
            setCurrentActiveInput={setCurrentActiveInput}
            error={error?.errors?.first_name}
          />
          <Input
            placeholder="Last Name"
            name="last name"
            type="text"
            value={lastNameValue}
            changeFunc={setUserLastName}
            currentActiveInput={currentActiveInput}
            setCurrentActiveInput={setCurrentActiveInput}
            error={error?.errors?.last_name}
          />
          <Input
            placeholder="Address"
            name="address"
            type="text"
            value={addressValue}
            changeFunc={setUserAddress}
            currentActiveInput={currentActiveInput}
            setCurrentActiveInput={setCurrentActiveInput}
          />
          <div className="flex flex-row gap-3">
            <Input
              placeholder="City"
              name="city"
              type="text"
              value={cityValue}
              changeFunc={setUserCity}
              currentActiveInput={currentActiveInput}
              setCurrentActiveInput={setCurrentActiveInput}
            />
            <Input
              placeholder="State"
              name="state"
              type="text"
              value={stateValue}
              changeFunc={setUserState}
              currentActiveInput={currentActiveInput}
              setCurrentActiveInput={setCurrentActiveInput}
            />
          </div>
          <CountriesOverlay
            changeCurrentCountry={setUserCountry}
            activeCountry={countryValue}
          />
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
              className="py-2 main-yellow-background-color primary-color text-2sb w-full
            flex flex-row gap-2 items-center justify-center rounded-md font-bold"
            >
              Next
              <Image src={rightArrow} alt="right arrow" />
            </button>
          )}
        </form>
      </AuthContainer>
      <button
        className="primary-color"
        onClick={() => {
          changeCurrentStep((prev: number) => prev + 1);
        }}
      >
        pass
      </button>
    </div>
  );
}
