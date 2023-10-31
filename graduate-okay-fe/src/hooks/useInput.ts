import { useState, ChangeEvent } from "react";

interface InputHook {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const useInput = (initialValue: string): InputHook => {
  const [value, setValue] = useState(initialValue);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return {
    value,
    onChange: handleChange,
  };
};

export default useInput;
