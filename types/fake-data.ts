import {  } from '@prisma/client';
import { faker } from '@faker-js/faker';
import Decimal from 'decimal.js';



export function fakePost() {
  return {
    updatedAt: faker.date.anytime(),
    title: faker.lorem.words(5),
    content: undefined,
  };
}
export function fakePostComplete() {
  return {
    id: faker.number.int({ max: 2147483647 }),
    createdAt: new Date(),
    updatedAt: faker.date.anytime(),
    title: faker.lorem.words(5),
    content: undefined,
    published: false,
    authorId: faker.number.int(),
  };
}
export function fakeProfile() {
  return {
    bio: undefined,
  };
}
export function fakeProfileComplete() {
  return {
    id: faker.number.int({ max: 2147483647 }),
    bio: undefined,
    userId: faker.number.int(),
  };
}
export function fakeUser() {
  return {
    email: faker.internet.email(),
    name: undefined,
    address: undefined,
    phone: undefined,
    image: undefined,
  };
}
export function fakeUserComplete() {
  return {
    id: faker.number.int({ max: 2147483647 }),
    email: faker.internet.email(),
    name: undefined,
    address: undefined,
    phone: undefined,
    image: undefined,
    gender: 'Male',
  };
}
