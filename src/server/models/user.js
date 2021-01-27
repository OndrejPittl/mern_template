import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  firstName: {
    type: String,
    required: false
  },
  lastName: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  birthdate: {
    type: Date,
    required: false
  },
  reservations: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Book'
    }
  ]
});

export default model('User', userSchema);
