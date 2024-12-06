import { number, object, string } from 'yup'

export const todoSchema = object().shape({
  title: string().trim().required('Title is required'),
  description: string().trim(),
  time: object().shape({
    hour: number()
      .required('Hour is required')
      .min(0, 'Hour must be between 0 and 23')
      .max(23, 'Hour must be between 0 and 23'),
    minute: number()
      .required('Minute is required')
      .min(0, 'Minute must be between 0 and 59')
      .max(59, 'Minute must be between 0 and 59')
  })
})
