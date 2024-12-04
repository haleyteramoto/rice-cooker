import * as Yup from 'yup';

export const AddStuffSchema = Yup.object({
  name: Yup.string().required(),
  quantity: Yup.number().positive().required(),
  condition: Yup.string().oneOf(['excellent', 'good', 'fair', 'poor']).required(),
  owner: Yup.string().required(),
});

export const EditStuffSchema = Yup.object({
  id: Yup.number().required(),
  name: Yup.string().required(),
  quantity: Yup.number().positive().required(),
  condition: Yup.string().oneOf(['excellent', 'good', 'fair', 'poor']).required(),
  owner: Yup.string().required(),
});

export interface Vendor {
  name: string;
  address: string;
  image: string;
  website: string;
}

export interface Recipe {
  title: string;
  description: string;
  ingredients: string;
  cuisine: string;
  dietary: string;
  imageUrl: string;
  link: string;
  createdAt: Date;
  updatedAt: Date;
}
