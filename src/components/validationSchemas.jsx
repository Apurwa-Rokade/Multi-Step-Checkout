import * as Yup from 'yup';

// Validation schema for the Details step
export const basicInfoSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    contact: Yup.string().matches(/^\d{10}$/, 'Invalid mobile number').required('Mobile number is required'),
    address: Yup.string().required('Address is required'),
});

// Validation schema for the Payment step
export const paymentInfoSchema = Yup.object().shape({
    cardNumber: Yup.string()
      .matches(/^\d{16}$/, 'Invalid card number')
      .required('Card number is required'),
    cvv: Yup.string()
      .matches(/^\d{3}$/, 'Invalid CVV')
      .required('CVV is required'),
    expiryMonth: Yup.string()
      .matches(/^(0[1-9]|1[0-2])$/, 'Invalid month')
      .required('Expiry month is required'),
    expiryYear: Yup.string()
      .matches(/^(?:20[2-9][0-9]|2[1-9][0-9]{2}|[3-9][0-9]{3}|[1-9][0-9]{4,})$/, 'Invalid year')
      .required('Expiry year is required'),
      
      expiry :Yup.string().test('is-future-date', 'Expiry date must be in the future', function (value) {
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth() + 1; // Month is zero-based, so adding 1
  
        // Convert expiryYear and expiryMonth to numbers
        const expiryYear = parseInt(this.parent.expiryYear, 10);
        const expiryMonth = parseInt(this.parent.expiryMonth, 10);
  
        // Check if the expiry year is greater than the current year OR
        // if the expiry year is equal to the current year and the expiry month is greater than the current month
        return expiryYear > currentYear || (expiryYear === currentYear && expiryMonth > currentMonth);
      }),
  });
  
