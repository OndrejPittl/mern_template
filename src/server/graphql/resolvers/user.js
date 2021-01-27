/* eslint-disable no-useless-catch */
import User from '../../models/user';
import { transformUser } from '../../helpers/user';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../../config/config';

const resolver = {
  /**
   * Gets all users.
   */
  users: async () => {
    try {
      const users = await User.find();
      return users.map(u => transformUser(u));
    } catch (err) {
      throw err;
    }
  },

  /**
   * Creates new user.
   * @param {*} args
   */
  createUser: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }

    const { firstName, lastName, email } = args.input;
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error('User with the given email already exists.');
      }
      const password = await bcryptjs.hash(args.input.password, 12);
      const user = new User({ firstName, lastName, email, password });
      const result = await user.save();
      return transformUser(result);
    } catch (err) {
      throw err;
    }
  },

  login: async ({ email, password }) => {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error('Invalid credentials.');
      }

      const isEqual = await bcryptjs.compare(password, user.password);
      if (!isEqual) {
        throw new Error('Invalid credentials.');
      }

      const token = await jwt.sign({ userId: user.id, email: user.email }, config.authSecret, {
        expiresIn: config.authTokenExpiration
      });

      return {
        userId: user.id,
        token,
        tokenExpiration: 1
      };
    } catch (err) {
      throw err;
    }
  }
};

export default resolver;
