import { useAppDispatch, useAppSelector } from "@/redux/reduxHooks";
import Image from "next/image";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
interface InputProps {
  placeholder: string;
  type: string;
  changeFunc: Function;
  value: string;
  name: string;
  currentActiveInput: string | null;
  setCurrentActiveInput: Function;
  properties?: {
    min?: number;
    max?: number;
    required?: boolean;
  };
  icon?: any;
  changeIcon?: any;
  error?: string;
}
export default function Input({
  placeholder,
  type,
  changeFunc,
  value,
  name,
  currentActiveInput,
  setCurrentActiveInput,
  icon,
  changeIcon,
  properties: { min, max, required } = {},
  error,
}: InputProps) {
  let labelVariants = {
    active: {
      x: -10,
      y: -38,
      transition: {
        duration: 0.2,
      },
    },
    inactive: {
      x: 0,
      y: 0,
      transition: {
        duration: 0.2,
      },
    },
  };
  let errorState = {
    active: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
      },
    },
    inactive: {
      opacity: 0,
      y: -40,
      transition: {
        duration: 0.5,
      },
    },
  };
  const dispatch = useAppDispatch();
  const [isInputClicked, setIsInputClicked] = useState(false);
  const [currentIcon, setCurrentIcon] = useState(icon);
  const [currentType, setCurrentType] = useState(type);
  const inputRef = useRef<HTMLInputElement>(null);
  const togglePasswordVisibility = () => {
    if (currentType === "password") {
      setCurrentType("text");
    } else {
      setCurrentType("password");
    }
    inputRef.current?.focus();
  };
  const toggleIcon = () => {
    if (currentIcon === icon) {
      setCurrentIcon(changeIcon);
    } else {
      setCurrentIcon(icon);
    }
  };
  return (
    <div>
      <div
        onClick={() => {
          setCurrentActiveInput(name);
          setIsInputClicked(true);
          inputRef.current?.focus();
        }}
        className={`px-3 w-full border rounded-md shadow-md bg-white outline-black
      flex flex-row justify-between primary-color relative 
      ${isInputClicked ? "outline-1 outline" : ""}`}
      >
        <motion.label
          variants={labelVariants}
          animate={
            currentActiveInput == name || inputRef.current?.value
              ? "active"
              : "inactive"
          }
          className={`absolute top-1/4 ${
            isInputClicked || value ? "text-4sb" : ""
          }`}
        >
          {placeholder}
        </motion.label>
        <input
          className={`h-full py-4 w-10/12 outline-none `}
          type={currentType}
          value={value}
          name={name}
          onBlur={() => {
            setIsInputClicked(false);
            if (value === "") {
              setCurrentActiveInput(null);
            }
          }}
          onChange={(e) => {
            dispatch(changeFunc(e.target.value));
          }}
          ref={inputRef}
          minLength={min}
          maxLength={max}
          required={required}
        />
        {icon ? (
          <Image
            className="cursor-pointer"
            src={currentIcon}
            alt="icon"
            onClick={() => {
              togglePasswordVisibility();
              if (changeIcon) {
                toggleIcon();
              }
            }}
          />
        ) : (
          ""
        )}
      </div>
      <motion.small
        className="text-red-600 text-center text-4sb"
        variants={errorState}
        animate={error ? "active" : "inactive"}
      >
        {error}
      </motion.small>
    </div>
  );
}
