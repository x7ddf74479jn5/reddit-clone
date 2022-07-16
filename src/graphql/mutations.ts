import { gql } from "@apollo/client";

export const ADD_POST = gql`
  mutation MyMutation($body: String!, $image: String!, $subreddit_id: ID!, $title: String!, $username: String!) {
    insertPost(image: $image, body: $body, subreddit_id: $subreddit_id, title: $title, username: $username) {
      image
      body
      created_at
      subreddit_id
      title
      username
    }
  }
`;

export const ADD_SUBREDDIT = gql`
  mutation MyMutation($topic: String!) {
    insertSubreddit(topic: $topic) {
      id
      topic
      created_at
    }
  }
`;
