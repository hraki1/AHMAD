export const addressValidate = (formData) => {
  const errors = {};

  if (!formData.fullName.trim()) {
    errors.fullName = "Full Name is required.";
  } else if (!/^[A-Za-z][A-Za-z0-9\s]*$/.test(formData.fullName)) {
    errors.fullName =
      "Full Name must start with a letter and contain only letters, numbers, and spaces.";
  }

  if (!formData.phoneNumber.trim()) {
    errors.phoneNumber = "Phone Number is required.";
  } else if (!/^\+\d+$/.test(formData.phoneNumber)) {
    errors.phoneNumber =
      "Phone Number must start with '+' and contain digits only.";
  }

  if (!formData.addressOne.trim()) {
    errors.addressOne = "Address is required.";
  }

  if (!formData.postCode.trim()) {
    errors.postCode = "Postcode is required.";
  } else if (!/^\d+$/.test(formData.postCode)) {
    errors.postCode = "Postcode must contain only numbers.";
  }

  if (!formData.country) {
    errors.country = "Country is required.";
  }

  if (!formData.city) {
    errors.city = "City is required.";
  }

  return errors;
};
