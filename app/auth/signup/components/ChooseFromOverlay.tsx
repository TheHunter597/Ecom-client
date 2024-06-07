import { useRef, useState } from "react";
import searchIcon from "@/public/assets/nav/searchIcon.svg";
import Image from "next/image";
import downArrow from "@/public/assets/arrows/downArrow.svg";
import { AnimatePresence, motion } from "framer-motion";
import { useAppDispatch } from "@/redux/reduxHooks";
export default function ChooseFromOverlay({
  changeCurrentActive,
  currentActive,
  list,
  text,
}: {
  changeCurrentActive: Function;
  currentActive: string;
  list: string[];
  text: string;
}) {
  let dispatch = useAppDispatch();
  let listVariants = {
    active: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
      },
      zIndex: 10,
    },
    inactive: {
      opacity: 0,
      y: -50,
      transition: {
        duration: 0.4,
      },
    },
  };
  let [countriesList, setCountriesList] = useState(list);
  let [listActive, setListActive] = useState(false);

  let countrySearch = useRef<HTMLInputElement>(null);
  return (
    <div
      className="relative w-full border-gray-100 border z-10"
      onBlur={() => {
        setListActive(false);
      }}
    >
      <div
        className="flex flex-row justify-between rounded-md shadow-lg  px-3 cursor-pointer "
        onClick={() => {
          setListActive(true);
          setTimeout(() => {
            countrySearch.current?.focus();
          }, 1);
        }}
      >
        <p className="py-4 primary-color">
          {currentActive ? currentActive : text}
        </p>
        <Image src={downArrow} alt="downArrow" />
      </div>
      <div className="absolute top-full">
        <AnimatePresence>
          {listActive && (
            <motion.div
              className=" rounded-md shadow-md bg-white z-10 px-3 right-0 py-4
            border border-gray-200 flex flex-col gap-4 "
              variants={listVariants}
              initial="inactive"
              animate="active"
              exit="inactive"
            >
              <div
                className={`
              flex flex-row justify-center items-center gap-1 py-2 px-3 border rounded-md outline-black`}
                onClick={() => {
                  countrySearch.current?.focus();
                }}
              >
                <Image src={searchIcon} alt="searchIcon" />
                <input
                  placeholder="Search"
                  className="py-2 px-2 outline-none primary-color"
                  ref={countrySearch}
                  onChange={(e) => {
                    let filteredCountries = list.filter((country: any) => {
                      return country
                        .toLowerCase()
                        .includes(e.target.value.toLowerCase());
                    });
                    setCountriesList(filteredCountries);
                  }}
                ></input>
              </div>
              <div className="h-56 overflow-y-auto">
                {countriesList.map((country: any, index: number) => (
                  <div
                    key={index}
                    className="py-2 px-2 hover:bg-gray-100 cursor-pointer primary-color"
                    onClick={() => {
                      dispatch(changeCurrentActive(country));
                      setListActive((prev) => !prev);
                    }}
                  >
                    <p className="primary-color">{country}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
