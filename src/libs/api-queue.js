import { API, graphqlOperation } from "aws-amplify";
import * as mutations from "@Graphql/mutations";

export const addToQueue = (item) => {
  const input = {
    ...item,
  };

  if (item.content) {
    input.content = JSON.stringify(item.content);
  }

  return API.graphql(graphqlOperation(mutations.createPost, { input })).then(
    ({ data: { createPost } }) => createPost
  );
};

export const removeFromQueue = (id) =>
  API.graphql(graphqlOperation(mutations.deletePost, { input: { id } })).then(
    ({ data: { deletePost } }) => {
      console.log(deletePost);
      return deletePost;
    }
  );

// import Amplify, { API, graphqlOperation } from "aws-amplify";

// const CreateEvent = `mutation CreateEvent($name: String!, $when: String!, $where: String!, $description: String!) {
// createEvent(name: $name, when: $when, where: $where, description: $description) {
//   id
//   name
//   where
//   when
//   description
// }
// }`;

// // Mutation
// const eventDetails = {
//   name: 'Party tonight!',
//   when: '8:00pm',
//   where: 'Ballroom',
//   description: 'Coming together as a team!'
// };

// const newEvent = await API.graphql(graphqlOperation(CreateEvent, eventDetails));
// console.log(newEvent);

// export const getTeam = (id) =>
//   API.graphql(graphqlOperation(queries.geTeam, { id }))
//     .then((result) => {
//       const {
//         data: { getUser },
//       } = result;

//       return getUser;
//     })
//     .catch((error) => {
//       console.log(error);
//     });
