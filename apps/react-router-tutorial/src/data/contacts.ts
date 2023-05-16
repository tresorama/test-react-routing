import { faker } from '@faker-js/faker';
import { matchSorter } from 'match-sorter';

// Utils
const doIt = (iteration: number, cb: () => void) => {
  Array(iteration)
    .fill("")
    .forEach(() => cb());
};
const log = console.log;
const sleep = (timeInMs: number) => new Promise(res => setTimeout(res, timeInMs));


// Data
export type Contact = {
  id: number,
  first: string;
  last: string;
  avatar: string;
  twitter: string;
  notes: string;
  favorite: boolean;
};

const createUser = (index: number): Contact => ({
  id: index + 1,
  first: faker.name.firstName(),
  last: faker.name.lastName(),
  avatar: faker.image.avatar(),
  twitter: "handle-" + index,
  notes: faker.lorem.text(),
  favorite: Math.random() > 0.5
});


export const contacts: Contact[] = Array(3).fill('').map(
  (_, i) => createUser(i)
);
// [
//   {
//     id: 1,
//     first: "Your",
//     last: "Name",
//     avatar: "https://placekitten.com/g/200/200",
//     twitter: "your_handle",
//     notes: "Some notes",
//     favorite: true,
//   },
// ];


// API
export const getContacts = async (searchTerm?: string | null) => {
  await sleep(400);
  if (!searchTerm) return contacts;
  const filteredContacts = matchSorter(
    contacts,
    searchTerm,
    {
      keys: ['first', 'last'] as (keyof Contact)[]
    }
  );
  return filteredContacts;
};
export const getContact = async (id: Contact['id']) => {
  await sleep(400);
  const contact = contacts.find(c => c.id === id);
  return contact ?? null;
};
export const createContact = async () => {
  await sleep(400);
  contacts.push(createUser(contacts.length));
  return contacts[contacts.length - 1];
};
export const updateContact = async (id: Contact['id'], updates: Partial<Contact>) => {
  await sleep(400);
  const contactIndex = contacts.findIndex(contact => contact.id === id);
  if (contactIndex === -1) throw new Error("No contact found for" + String(id));
  const contact = contacts[contactIndex];
  const updatedContact = Object.assign(contact, updates);
  contacts.splice(contactIndex, 1, updatedContact);
  return updatedContact;
};
export const deleteContact = async (id: Contact['id']) => {
  const contactIndex = contacts.findIndex(c => c.id === id);
  if (!contactIndex) return;
  contacts.splice(contactIndex, 1);
};