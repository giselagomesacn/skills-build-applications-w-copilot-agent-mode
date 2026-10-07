import mongoose from 'mongoose';
import Activity from '../models/Activity.js';
import Leaderboard from '../models/Leaderboard.js';
import Team from '../models/Team.js';
import User from '../models/User.js';
import Workout from '../models/Workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);
    console.log('Connected to octofit_db');

    const team = (await Team.findOne()) ?? (await Team.create({ name: 'Octocats', points: 0 }));
    let users = await User.find().limit(2);
    if (users.length === 0) {
      users = await User.insertMany([
        { name: 'Mona Octocat', email: 'mona@example.com', team: team._id, points: 120 },
        { name: 'Ada Lovelace', email: 'ada@example.com', team: team._id, points: 95 },
      ]);
    }

    if (team.members.length === 0) {
      team.members = users.map((user) => user._id);
      await team.save();
    }

    if (await Activity.countDocuments() === 0) {
      await Activity.insertMany([
        { user: users[0]._id, type: 'running', durationMinutes: 30, distanceKilometers: 5, points: 60 },
        { user: users[0]._id, type: 'strength training', durationMinutes: 25, points: 40 },
      ]);
    }

    if (await Leaderboard.countDocuments() === 0) {
      await Leaderboard.insertMany([
        ...users.map((user) => ({ user: user._id, team: team._id, points: user.points, period: 'weekly' })),
      ]);
    }

    if (await Workout.countDocuments() === 0) {
      await Workout.insertMany([
        {
          name: 'Interval Run',
          description: 'Alternate short, brisk runs with easy recovery periods.',
          difficulty: 'beginner',
          activities: ['running', 'walking'],
          durationMinutes: 25,
        },
      ]);
    }

    console.log('Database seeding complete');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exitCode = 1;
  } finally {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
  }
}

void seedDatabase();
