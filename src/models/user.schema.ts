import { Schema, Document } from 'mongoose';

interface User extends Document {
  name: string;
  email: string;
  age: number;
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    birthDate: { type: Date, required: true },
  },
  { collection: 'users' },
);

export { User, UserSchema };
