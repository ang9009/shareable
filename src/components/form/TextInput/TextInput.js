import React from "react";
import * as Form from "@radix-ui/react-form";
import { toCamelCase } from "../../../utils/toCamelCase";
import InputMessage from "../InputMessage/InputMessage";

function TextInput({
  options: { className, label, placeholder, max },
  formData: { register, errors },
}) {
  // The "required" prop from Radix conflicts with the error object from react-hook-form so don't add it

  const registerSettings = {
    ...register(toCamelCase(label), {
      required: "This input is required",
      maxLength: {
        value: max,
        message: `Must be ${max} characters or less`,
      },
    }),
  };

  return (
    <Form.Field className={`input-field-container ${className}`}>
      <Form.Label className={"input-label"}>{label}</Form.Label>
      <Form.Control asChild>
        <>
          <input
            {...registerSettings}
            className={"input"}
            type={"text"}
            placeholder={placeholder}
            autoComplete="off"
            style={{
              outline:
                errors[toCamelCase(label)] && "var(--input-warning-border)",
            }}
          />
          <InputMessage message={errors[toCamelCase(label)]?.message} isError />
        </>
      </Form.Control>
    </Form.Field>
  );
}

export default TextInput;
