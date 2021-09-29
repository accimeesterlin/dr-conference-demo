// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { User, TeamInvitation, Team, Post } = initSchema(schema);

export {
  User,
  TeamInvitation,
  Team,
  Post
};