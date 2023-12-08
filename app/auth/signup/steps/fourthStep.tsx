import AuthContainer from "../../components/container";

import Interest from "../components/interest";
import { useFetch } from "@/utils/hooks/useFetch";
import { useAppSelector } from "@/redux/reduxHooks";
import rightArrow from "@/public/assets/arrows/rightArrow.svg";
import ReactLoading from "react-loading";
import Image from "next/image";

export default function FourthStep({
  changeCurrentStep,
}: {
  changeCurrentStep: Function;
}) {
  let interests = [
    "Art",
    "Business",
    "Gamimg",
    "Education",
    "Entertainment",
    "Food",
    "Health",
    "History",
    "Reading",
    "Men fashion",
    "Women fashion",
    "Politics",
    "Science",
    "Sports",
    "Technology",
    "Travel",
  ];
  let chosen_interests = useAppSelector(
    (state) => state.userCreation.interests
  );

  let allInterests = interests.map((interest, index) => {
    return <Interest name={interest} key={index} id={index} />;
  });
  let { data, loading, error, fetchData } = useFetch({
    url: "/api/v1/auth/update/",
    method: "put",
    body: {
      interests: chosen_interests,
    },
    withCredentials: true,
    withToken: true,
  });
  return (
    <div className="pt-20 flex flex-col items-center gap-10 primary-color w-full">
      <h2 className="flex flex-col gap-2 items-center">
        <span className="text-3sb">step 3 of 4</span>
        <span className="header-6sb">Personal interests</span>
      </h2>
      <AuthContainer>
        <form
          className="py-2 flex flex-col gap-8"
          onSubmit={async (e) => {
            e.preventDefault();
            let result = await fetchData();
            if (result) {
              changeCurrentStep((prev: number) => prev + 1);
            }
          }}
        >
          <h3 className="primary-color text-2xl font-bold text-center">
            Choose your <span className="text-red-500">personal interests</span>{" "}
            what products do you like{" "}
          </h3>
          <div className="flex flex-wrap gap-2">{allInterests}</div>
          {error && error.message ? (
            <small className="text-red-600 text-center text-3sb">
              {error.message}
            </small>
          ) : (
            ""
          )}
          {data && data.message ? (
            <small className="text-green-600 text-center text-3sb">
              {data.message}
            </small>
          ) : (
            ""
          )}

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
          <button
            className="primary-color"
            onClick={() => {
              changeCurrentStep((prev: number) => prev + 1);
            }}
          >
            pass
          </button>
        </form>
      </AuthContainer>
    </div>
  );
}
