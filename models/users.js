import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserSchema = new Schema({
  ad: {
    type: String,
    required: true,    
},
  email: {
    type: String,
    required: true,
  },
});
export default mongoose.models.User || mongoose.model("User", UserSchema);