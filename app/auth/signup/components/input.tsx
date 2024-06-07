import { useAppDispatch, useAppSelector } from "@/redux/reduxHooks";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import InputError from "./InputError";
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
    numberInupt?: boolean;
    disabled?: boolean;
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
  properties: { min, max, required, numberInupt, disabled } = {},
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

  const dispatch = useAppDispatch();
  const [isInputActive, setIsInputActive] = useState(false);
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
  useEffect(() => {
    if (inputRef.current?.value) {
      setCurrentActiveInput(name);
      setIsInputActive(true);
    }
  }, [inputRef.current?.value]);
  return (
    <div>
      <div
        onClick={() => {
          setCurrentActiveInput(name);
          setIsInputActive(true);
          inputRef.current?.focus();
        }}
        className={`px-3 w-full border rounded-md shadow-md bg-white outline-black
      flex flex-row justify-between primary-color relative 
      ${isInputActive ? "outline-1 outline" : ""} ${
          disabled ? "bg-gray-200" : ""
        }`}
      >
        <motion.label
          variants={labelVariants}
          animate={
            currentActiveInput == name ||
            inputRef.current?.value ||
            isInputActive
              ? "active"
              : "inactive"
          }
          className={`absolute top-1/4 ${
            isInputActive || value ? "text-4sb" : ""
          }`}
        >
          {placeholder}
        </motion.label>
        <input
          disabled={disabled}
          className={`h-full py-4 w-10/12 outline-none text-3sb  ${
            disabled ? "bg-gray-200" : ""
          }`}
          type={currentType}
          value={value}
          name={name}
          onBlur={() => {
            setIsInputActive(false);
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
      <InputError error={error} />
    </div>
  );
}
