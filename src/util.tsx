import { PhoneNumberUtil, PhoneNumberFormat } from "google-libphonenumber";

const phoneUtil = PhoneNumberUtil.getInstance();

export const validateAndFormatKenyanPhoneNumber = (
  phone: string
): {
  isValid: boolean;
  formattedPhoneWithCode?: string;
  formattedPhone?: string;
} => {
  try {
    const number = phoneUtil.parseAndKeepRawInput(phone, "KE");

    const isValid = phoneUtil.isValidNumber(number);

    let formattedPhoneWithCode: string | undefined;
    let formattedPhone: string | undefined;

    if (isValid) {
      // Format with country code but remove the "+"
      formattedPhoneWithCode = phoneUtil
        .format(number, PhoneNumberFormat.INTERNATIONAL)
        .replace("+", "")
        .replaceAll(" ", "");

      // Format without country code
      formattedPhone = phoneUtil
        .format(number, PhoneNumberFormat.NATIONAL)
        .replaceAll(" ", "");
    }

    return {
      isValid,
      formattedPhoneWithCode,
      formattedPhone,
    };
  } catch (error) {
    console.error("Error validating phone number:", error);
    return { isValid: false };
  }
};
