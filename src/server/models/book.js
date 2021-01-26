import { Schema, model } from 'mongoose';

const bookSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  genre: {
    type: Array,
    ref: 'Genre',
    required: false
  },
  authors: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Author'
    }
  ]
});

export default model('Book', bookSchema);
