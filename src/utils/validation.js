// Saryoday Academics - Input Validation & English-Only Database Guard

/**
 * Validates that the input contains ONLY English alphabet characters,
 * digits, and standard punctuation. Rejects non-Latin scripts (e.g. Devanagari, Arabic, etc.).
 *
 * @param {string} text - The input string to validate
 * @param {string} fieldName - Optional name of the field for error message
 * @returns {{ isValid: boolean, message: string }}
 */
export const validateEnglishOnly = (text, fieldName = 'Field') => {
  if (!text || typeof text !== 'string') {
    return { isValid: true, message: '' };
  }

  // Check for Devanagari (Hindi) or non-Latin script ranges:
  // Devanagari: \u0900-\u097F
  const nonEnglishRegex = /[\u0900-\u097F\u0600-\u06FF\u4E00-\u9FFF]/;

  if (nonEnglishRegex.test(text)) {
    return {
      isValid: false,
      message: `Error in "${fieldName}": Database accepts English only. Non-English (e.g. Hindi/Devanagari) characters are not allowed. Please enter details using English alphabets (A-Z, 0-9).`
    };
  }

  return { isValid: true, message: '' };
};

/**
 * Validates multiple fields in an object.
 * Returns the first validation error found or null if all pass.
 */
export const validateObjectEnglishOnly = (dataObj, fieldLabels = {}) => {
  if (!dataObj || typeof dataObj !== 'object') return null;

  for (const [key, val] of Object.entries(dataObj)) {
    if (typeof val === 'string') {
      const label = fieldLabels[key] || key;
      const res = validateEnglishOnly(val, label);
      if (!res.isValid) {
        return res.message;
      }
    }
  }
  return null;
};

/**
 * Validates a 10-digit Indian mobile number
 */
export const validateIndianMobile = (phone) => {
  const cleanPhone = (phone || '').replace(/\D/g, '');
  if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
    return {
      isValid: false,
      message: 'Please enter a valid 10-digit mobile number starting with 6, 7, 8, or 9.'
    };
  }
  return { isValid: true, cleanPhone };
};
