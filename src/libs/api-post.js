import { API, graphqlOperation } from "aws-amplify";
import * as mutations from "@Graphql/mutations";

const postParser = (el) => ({
  ...el,
  content: el.content ? JSON.parse(el.content) : null,
  fb: el.fb ? JSON.parse(el.fb) : null,
  twitter: el.twitter ? JSON.parse(el.twitter) : null,
  wp: el.wp ? JSON.parse(el.wp) : null,
  channelsContent: el.channelsContent
    ? el.channelsContent.map((elm) => JSON.parse(elm))
    : el.channelsContent,
});

const postsParser = (posts) => ({
  nextToken: posts.nextToken,
  items: posts.items.map((el) => postParser(el)),
});

export const createNewPost = (item) => {
  const input = {
    ...item,
  };

  if (item.content) {
    input.content = JSON.stringify(item.content);
  }

  return API.graphql(graphqlOperation(mutations.createPost, { input })).then(
    ({ data: { createPost } }) => postParser(createPost)
  );
};

export const removePostById = (id) =>
  API.graphql(graphqlOperation(mutations.deletePost, { input: { id } })).then(
    ({ data: { deletePost } }) => deletePost
  );

export const removePost = (teamId, createdAt) =>
  API.graphql(
    graphqlOperation(mutations.deletePost, { input: { teamId, createdAt } })
  ).then(({ data: { deletePost } }) => deletePost);

export const updatePost = (details, userId) => {
  if (!userId) throw new Error("You must passa userId (current user email)");
  const input = {
    ...details,
    updatedByField: userId,
    updatedAt: details.updatedAt || new Date().toISOString(),
  };

  if (details.content) {
    input.content = JSON.stringify(details.content);
  }

  if (details.channelsContent) {
    input.channelsContent = details.channelsContent.map((el) =>
      JSON.stringify(el)
    );
  }

  return API.graphql(
    graphqlOperation(mutations.updatePost, {
      input,
    })
  ).then(({ data }) => postParser(data.updatePost));
};

const loadPostsFromTeam = /* GraphQL */ `
  query TeamWithPosts(
    $id: ID!
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    teamWithPosts: getTeam(id: $id) {
      posts(
        limit: $limit
        nextToken: $nextToken
        sortDirection: $sortDirection
      ) {
        items {
          id
          createdAt
          createdBy {
            email
            fullName
            avatar
          }
          updatedAt
          status
          tone
          source
          content
          publishedAt
          publishedBy {
            email
            fullName
            avatar
          }
          scheduleTime
          scheduleAt
          scheduleBy {
            email
            fullName
            avatar
          }
          updatedBy {
            email
            fullName
            avatar
          }
          channelsContent
          fb
          twitter
          wp
        }
        nextToken
      }
    }
  }
`;

export const loadPostsByTeamId = (id, options = {}) =>
  API.graphql(
    graphqlOperation(loadPostsFromTeam, {
      ...options,
      id,
      sortDirection: options.sortDirection || "DESC",
    })
  ).then(
    ({
      data: {
        teamWithPosts: { posts },
      },
    }) => postsParser(posts)
  );

const loadPostsMonthly = /* GraphQL */ `
  query TeamWithPosts(
    $id: ID!
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
    $createdAt: ModelStringKeyConditionInput
  ) {
    teamWithPosts: getTeam(id: $id) {
      posts(
        limit: $limit
        nextToken: $nextToken
        sortDirection: $sortDirection
        createdAt: $createdAt
      ) {
        items {
          id
          createdAt
          createdBy {
            email
            fullName
            avatar
          }
          updatedAt
          status
          tone
          source
          content
          publishedAt
          publishedBy {
            email
            fullName
            avatar
          }
          scheduleTime
          scheduleAt
          scheduleBy {
            email
            fullName
            avatar
          }
          updatedBy {
            email
            fullName
            avatar
          }
          channelsContent
          fb
          twitter
          wp
        }
        nextToken
      }
    }
  }
`;

export const loadPostsForMonth = (id, firstDay, options = {}) =>
  API.graphql(
    graphqlOperation(loadPostsMonthly, {
      id,
      createdAt: { beginsWith: firstDay.slice(0, 7) },
      sortDirection: "DESC",
      ...options,
    })
  ).then(
    ({
      data: {
        teamWithPosts: { posts },
      },
    }) => postsParser(posts)
  );

const loadPost = /* GraphQL */ `
  query TeamWithPosts($id: ID!, $createdAt: ModelStringKeyConditionInput) {
    teamWithPosts: getTeam(id: $id) {
      posts(createdAt: $createdAt) {
        items {
          id
          createdAt
          createdBy {
            email
            fullName
            avatar
          }
          updatedAt
          status
          tone
          source
          content
          publishedAt
          publishedBy {
            email
            fullName
            avatar
          }
          scheduleTime
          scheduleAt
          scheduleBy {
            email
            fullName
            avatar
          }
          updatedBy {
            email
            fullName
            avatar
          }
          channelsContent
          fb
          twitter
          wp
        }
        nextToken
      }
    }
  }
`;

export const getOnePost = (teamId, createdAt) =>
  API.graphql(
    graphqlOperation(loadPost, {
      id: teamId,
      createdAt: { eq: createdAt },
    })
  ).then(
    ({
      data: {
        teamWithPosts: { posts },
      },
    }) => postsParser(posts).items
  );
