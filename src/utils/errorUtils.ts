export function describeApiError(error: any): string {
  const message = error?.response?.data?.message;
  if (message == null) {
    return "There was an error, please try again.";
  }

  // Try to parse Joi errors
  const details = error?.response?.data?.data;
  let detailedError = "";
  if (Array.isArray(details)) {
    detailedError = details.map((e) => e.error).join(", ");
  }

  // Try to parse other known errors
  if (typeof details === "string") {
    switch (details) {
      case "emailInUse":
        detailedError =
          "The Email entered is already registered in the platform.";
        break;
      default:
        detailedError = details;
        break;
    }
  }

  return `${message}${detailedError.length ? ":" : ""} ${detailedError}`;
}
