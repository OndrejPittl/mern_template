import { Schema, model } from 'mongoose';

const authorSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  birthdate: {
    type: Date,
    required: false
  },
  books: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Book'
    }
  ]
});

export default model('Author', authorSchema);
