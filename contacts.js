const path = require("path");
const fs = require("fs/promises");
const { table } = require("console");
const { v4: uuidv4 } = require("uuid");
const argv = require("yargs").argv;

const contactsPath = path.join(__dirname, "db", "contacts.json");

// TODO: задокументировать каждую функцию
async function listContacts() {
  const data = await fs.readFile(contactsPath);
  const content = JSON.parse(data);
  console.table(content);
}
async function getContactById(contactId) {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  console.table(contacts.filter((contact) => contact.id === contactId));
}

async function removeContact(contactId) {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  const contactList = contacts.filter((contact) => contact.id !== contactId);
  console.table(contactList);
  await fs.writeFile(
    "./db/contacts.json",
    JSON.stringify(contactList, null, 2)
  );
}

async function addContact(name, email, phone) {
  const data = await fs.readFile(contactsPath);
  const content = JSON.parse(data);
  const newName = { id: uuidv4(), name, email, phone };
  content.push(newName);
  await fs.writeFile("./db/contacts.json", JSON.stringify(content, null, 2));
}
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
