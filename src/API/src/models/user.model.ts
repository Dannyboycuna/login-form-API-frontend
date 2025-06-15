import mongoose, {Schema, Document} from "mongoose";

export interface User {
  
  email: string;
  username: string;
  password: string;
}

const userSchema = new Schema<User>({
  email: {
    type: String,
    required: true,
    unique: true
  },

  username: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required:true
  }
})



export const UserModel=mongoose.model<User>('User', userSchema)