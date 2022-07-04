export const phoneValidator = (value, n, isMulti) => {
  let errors = {};
  if (isMulti) {
    value.forEach((v, index) => {
      if (v.toString()?.length !== n) {
        errors = {
          type: "phone",
          position: `${index + 1}`,
          error: "not valid phone",
          invalid: "true",
        };
      }
    });
  }

  return Object.values(errors).length !== 0
    ? errors
    : { type: "phone", invalid: false };
};
