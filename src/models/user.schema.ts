import { Schema, Document } from 'mongoose';

interface User extends Document {
  name: string;
  email: string;
  age: number;
}

const UserSchema: Schema = new Schema(
  {
    name: String,
    email: String,
    age: Number,
  },
  { collection: 'users' },
);

export { User, UserSchema };
