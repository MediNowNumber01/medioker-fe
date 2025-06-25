import * as Yup from 'yup';

export const AddressSchema = Yup.object().shape({
  label: Yup.string().required('Label is required'),
  fullAddress: Yup.string().min(10, 'Full address is too short').required('Full address is required'),
  postalCode: Yup.string().matches(/^[0-9]{1,7}$/, 'Maximum 7 digits').required('Postal code is required'),
  latitude: Yup.string().required('Please select a location on the map'),
  longitude: Yup.string().required('Please select a location on the map'),
});