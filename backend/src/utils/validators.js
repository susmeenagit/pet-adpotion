export const validators = {
  // Email validation
  isValidEmail: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  // Password validation (min 6 chars)
  isValidPassword: (password) => {
    return password && password.length >= 6;
  },

  // Species validation
  isValidSpecies: (species) => {
    return ['Dog', 'Cat', 'Rabbit'].includes(species);
  },

  // Gender validation
  isValidGender: (gender) => {
    return ['Male', 'Female', 'Unknown'].includes(gender);
  },

  // Adoption status validation
  isValidAdoptionStatus: (status) => {
    return ['Pending', 'Approved', 'Rejected'].includes(status);
  },

  // Required field validation
  isRequired: (value) => {
    return value !== null && value !== undefined && value !== '';
  },

  // Number validation
  isValidNumber: (value) => {
    return !isNaN(value) && value >= 0;
  },

  // Validate adoption application
  validateAdoptionApplication: (data) => {
    const errors = {};

    if (!validators.isRequired(data.fullName)) {
      errors.fullName = 'Full name is required';
    }

    if (!validators.isRequired(data.email)) {
      errors.email = 'Email is required';
    } else if (!validators.isValidEmail(data.email)) {
      errors.email = 'Invalid email format';
    }

    if (!validators.isRequired(data.phone)) {
      errors.phone = 'Phone is required';
    }

    if (!validators.isRequired(data.address)) {
      errors.address = 'Address is required';
    }

    if (!validators.isRequired(data.reason)) {
      errors.reason = 'Reason for adoption is required';
    }

    return {
      valid: Object.keys(errors).length === 0,
      errors,
    };
  },

  // Validate pet data
  validatePetData: (data) => {
    const errors = {};

    if (!validators.isRequired(data.name)) {
      errors.name = 'Pet name is required';
    }

    if (!validators.isRequired(data.species)) {
      errors.species = 'Species is required';
    } else if (!validators.isValidSpecies(data.species)) {
      errors.species = 'Species must be Dog, Cat, or Rabbit';
    }

    if (!validators.isRequired(data.breed)) {
      errors.breed = 'Breed is required';
    }

    if (data.age !== undefined && data.age !== null) {
      if (!validators.isValidNumber(data.age)) {
        errors.age = 'Age must be a positive number';
      }
    }

    if (data.height !== undefined && data.height !== null) {
      if (!validators.isValidNumber(data.height)) {
        errors.height = 'Height must be a positive number';
      }
    }

    return {
      valid: Object.keys(errors).length === 0,
      errors,
    };
  },

  // Validate user registration
  validateRegistration: (data) => {
    const errors = {};

    if (!validators.isRequired(data.email)) {
      errors.email = 'Email is required';
    } else if (!validators.isValidEmail(data.email)) {
      errors.email = 'Invalid email format';
    }

    if (!validators.isRequired(data.password)) {
      errors.password = 'Password is required';
    } else if (!validators.isValidPassword(data.password)) {
      errors.password = 'Password must be at least 6 characters';
    }

    if (!validators.isRequired(data.name)) {
      errors.name = 'Name is required';
    }

    return {
      valid: Object.keys(errors).length === 0,
      errors,
    };
  },
};
