import { yupResolver } from "@hookform/resolvers/yup";

import * as yup from "yup";

export const yupValidator = (schema: any) => {
  return yupResolver(yup.object().shape(schema));
};

export class FormValidation {
  static common(required?: boolean, maxLength = 100, minLength?: number) {
    const maxLengthMsg = "12";

    const minLengthMsg = "12";

    const requiredMsg = "Thông tin bắt buộc. Vui lòng nhập đầy đủ.";

    let validation = yup.string(); // Required

    if (maxLength && maxLength > 0) {
      validation = validation.max(maxLength, maxLengthMsg); // Check max length
    }

    if (minLength && minLength > 0) {
      validation = validation.min(minLength, minLengthMsg);
    }

    if (required) {
      validation = validation.required(requiredMsg); // Check requireds
    }

    return validation;
  }

  static emailvalidate(required?: boolean, msg?: string) {
    const requiredMsg = !msg
      ? "Thông tin bắt buộc. Vui lòng nhập đầy đủ."
      : msg;
    const emailMsg = "Địa chỉ email không đúng định dạng.";

    const EMAIL_REGEX =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    let validation = yup.string();

    if (required) {
      validation = validation.required(requiredMsg);
    }

    validation = validation.matches(EMAIL_REGEX, emailMsg);

    return validation;
  }

  static required(label: string) {
    const requiredMsg = "12";

    let validation = yup.string();

    validation = validation.required(requiredMsg);

    return validation;
  }

  static password(isRequired?: boolean) {
    const minLengthMsg = `Password must be at least 8 characters.`;
    const maxLengthMsg = `Password không quá 50 ký tự.`;
    const passwordRegex = /^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9\S]+$/;

    let validation = yup.string();

    if (isRequired) {
      validation = validation.required(`Password fiel is required`);
    }

    validation = validation.test(
      "is-long-enough",
      minLengthMsg,
      function (value) {
        // Skip validation if no value is provided
        if (!value) return true;
        // Perform validation only if value is provided
        return value.length >= 8;
      }
    );

    validation = validation.test("is-long-max", maxLengthMsg, function (value) {
      // Skip validation if no value is provided
      if (!value) return true;
      // Perform validation only if value is provided
      return value.length <= 50;
    });

    // Custom test to apply passwordRegex only when a value is provided
    validation = validation.test(
      "matches-password-regex",
      "Password must contain letters, numbers and special characters",
      function (value) {
        // Skip validation if no value is provided
        if (!value) return true;
        // Perform validation only if value is provided
        return passwordRegex.test(value);
      }
    );

    return validation;
  }

  static confirmPassword(isRequired?: boolean) {
    const requiredMsg = "Password confirm field is required";
    const confirmMustMatchMsg = "Password confirm do not match";

    let schemaValidation = yup.string();

    if (isRequired) {
      schemaValidation = schemaValidation.required(requiredMsg);
    }

    schemaValidation = schemaValidation.when(
      "password",
      (password: any, schema: any) => {
        if (Array.isArray(password) && password.toString()) {
          return schema
            .required(requiredMsg)
            .oneOf([yup.ref("password"), ""], confirmMustMatchMsg);
        }
        return schema;
      }
    );

    return schemaValidation;
  }

  static phoneValidate(isRequired?: boolean) {
    const phoneRegex = /^\+?[0-9]{1,3}\s?[0-9]{9,11}$/;
    const mesg = "Số điện thoại không đúng định dạng.";

    let validation = yup.string();

    if (isRequired) {
      validation = validation.required(
        "Thông tin bắt buộc. Vui lòng nhập đầy đủ."
      );
    }

    validation = validation.test("is-phone-number", mesg, function (value) {
      if (!value) return true;

      return phoneRegex.test(value);
    });

    return validation;
  }
}
