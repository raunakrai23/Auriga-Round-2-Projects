import mongoose from 'mongoose';

const habitSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  name: { type: String, required: true, trim: true, maxlength: 80 },
  description: { type: String, trim: true, maxlength: 240, default: '' },
  color: { type: String, default: '#8B5CF6', match: /^#[0-9A-Fa-f]{6}$/ },
  frequency: { type: String, enum: ['daily', 'weekdays', 'weekly'], default: 'daily' },
  completedDates: { type: [String], default: [] }
}, { timestamps: true });

export default mongoose.model('Habit', habitSchema);
