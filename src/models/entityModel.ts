export interface Attribute {
  type: string;
  fieldName: string;
  allowNull: boolean;
  values?: string[];
  validate?: any;
}

export interface SchemaModel {
  [key: string]: Attribute;
}

export interface EntityModel {
  [key: string]: any;
}

export const fakeUserSchema: SchemaModel = {
  id: { type: "integer", fieldName: "id", allowNull: false },
  name: { type: "string", fieldName: "name", allowNull: true },
  email: { type: "string", fieldName: "email", allowNull: false },
  password: { type: "string", fieldName: "password", allowNull: false },
  role: {
    type: "enum",
    fieldName: "role",
    allowNull: false,
    values: ["user", "admin"],
  },
};

export const fakeUsersData: EntityModel[] = [
  {
    email: "alex@example.com",
    id: 1,
    name: "Alex",
    password: "12345678",
    role: "admin",
  },
  {
    email: "bernard@example.com",
    id: 2,
    name: "Bernard",
    password: "password123",
    role: "user",
  },
];

export const fakeNoteSchema: SchemaModel = {
  id: { type: "integer", fieldName: "id", allowNull: false },
  title: { type: "string", fieldName: "name", allowNull: true },
  text: { type: "string", fieldName: "email", allowNull: false },
};

export const fakeNotesData: EntityModel[] = [
  { id: 1, title: "Note 1", text: "Textt of note 1" },
  { id: 2, title: "Note 2", text: "Textt of note 2" },
];
