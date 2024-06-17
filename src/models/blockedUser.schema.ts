import { Schema, Document } from 'mongoose';

interface BlockedUser extends Document {
  userId: string;
  blockedUsers: string[];
}

const BlockedUserSchema: Schema = new Schema(
  {
    userId: { type: String, unique: true },
    blockedUsers: [{ type: String }],
  },
  { collection: 'blockedUsers' },
);

export { BlockedUser, BlockedUserSchema };
