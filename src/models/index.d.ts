import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class User {
  readonly id: string;
  readonly email: string;
  readonly fullName?: string;
  readonly owner: string;
  readonly invitations?: (TeamInvitation | null)[];
  readonly workingTeam?: string;
  readonly avatar?: string;
  readonly notes?: (string | null)[];
  constructor(init: ModelInit<User>);
  static copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
}

export declare class TeamInvitation {
  readonly id: string;
  readonly teamId: string;
  readonly sender: string;
  readonly invitee: string;
  readonly role: string;
  readonly inviteeId: string;
  readonly status: string;
  readonly teamName: string;
  constructor(init: ModelInit<TeamInvitation>);
  static copyOf(source: TeamInvitation, mutator: (draft: MutableModel<TeamInvitation>) => MutableModel<TeamInvitation> | void): TeamInvitation;
}

export declare class Team {
  readonly id: string;
  readonly name: string;
  readonly ownerEmail: string;
  readonly description?: string;
  readonly editors?: (string | null)[];
  readonly editorsEmail?: (string | null)[];
  readonly publicationUrl?: string;
  readonly newsapiKey?: string;
  readonly posts?: (Post | null)[];
  readonly invitations?: (TeamInvitation | null)[];
  readonly channels?: (string | null)[];
  readonly activeChannels?: (string | null)[];
  constructor(init: ModelInit<Team>);
  static copyOf(source: Team, mutator: (draft: MutableModel<Team>) => MutableModel<Team> | void): Team;
}

export declare class Post {
  readonly id: string;
  readonly teamId: string;
  readonly tone?: string;
  readonly source: string;
  readonly content?: string;
  readonly publishedAt?: string;
  readonly scheduleTime?: string;
  readonly channelsContent?: (string | null)[];
  readonly fb?: string;
  readonly twitter?: string;
  readonly blog?: string;
  constructor(init: ModelInit<Post>);
  static copyOf(source: Post, mutator: (draft: MutableModel<Post>) => MutableModel<Post> | void): Post;
}