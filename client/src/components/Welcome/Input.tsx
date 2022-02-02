import React, { forwardRef } from "react";

// import { Container } from './styles';

type Props = {
  type: string;
  step?: number;
  placeholder: string;
};

const Input = forwardRef<HTMLInputElement, Props>(
  ({ type, step, placeholder }, ref) => {
    return (
      <input
        type={type}
        placeholder={placeholder}
        step={step}
        ref={ref}
        className="my-2 w-full rounded-md p-2 outline-none bg-transparent text-white border-white/25 text-sm placeholder:text-white/50"
      />
    );
  }
);

Input.displayName = "Input";

export default Input;
