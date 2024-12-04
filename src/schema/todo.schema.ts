import { object, string } from 'yup'

export const todoSchema = object().shape({
  title: string().trim().required('Title is required'),
  description: string().trim()
})
