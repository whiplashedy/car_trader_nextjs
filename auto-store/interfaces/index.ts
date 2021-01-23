// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import { User } from 'path/to/interfaces';

export type User = {
  id: number
  name: string
}

export interface FaqModel {
  id: number;
  question: string;
  answer: string;
}

export interface CarModel {
  id: number;
  make: string;
  model: string;
  year: number;
  fuelType: string;
  kilometers: number;
  details: string;
  price: number;
  photoUrl: string;
}

export interface Make {
  make: string;
  count?: any;
}

export interface Model {
  model: string;
  count?: any;
}


