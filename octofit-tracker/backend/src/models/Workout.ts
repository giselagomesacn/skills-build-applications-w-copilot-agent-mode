import { model, Schema } from 'mongoose';

const workoutSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
    activities: [{ type: String, trim: true }],
    durationMinutes: { type: Number, required: true, min: 1 },
  },
  { timestamps: true },
);

export default model('Workout', workoutSchema);
