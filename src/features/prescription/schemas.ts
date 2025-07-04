import * as Yup from 'yup';

const FILE_SIZE = 1 * 1024 * 1024;
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png', 'image/heic' ];

export const UploadPrescriptionSchema = Yup.object().shape({
  prescriptionImages: Yup.array()
    .of(
      Yup.mixed<File>()
        .test('fileSize', 'Max file size is 2MB per image', value => value ? value.size <= FILE_SIZE : true)
        .test('fileFormat', 'Unsupported format', value => value ? SUPPORTED_FORMATS.includes(value.type) : true)
    )
    .min(1, 'Please upload at least one prescription image.')
    .max(5, 'You can upload a maximum of 5 images.'),
  
  notes: Yup.string().optional(),

  deliveryMethod: Yup.string().oneOf(['delivery', 'pickup']).required(),

  addressId: Yup.string().when('deliveryMethod', {
    is: 'delivery',
    then: schema => schema.required('Please select a delivery address'),
    otherwise: schema => schema.notRequired(),
  }),
  
  pharmacyId: Yup.string().required('Please select a pharmacy'),
});