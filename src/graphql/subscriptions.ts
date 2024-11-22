/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateUser = /* GraphQL */ `subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
  onCreateUser(filter: $filter) {
    id
    email
    firstname
    lastname
    phonenumber
    posts {
      nextToken
      __typename
    }
    followings {
      nextToken
      __typename
    }
    chats {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateUserSubscriptionVariables,
  APITypes.OnCreateUserSubscription
>;
export const onUpdateUser = /* GraphQL */ `subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
  onUpdateUser(filter: $filter) {
    id
    email
    firstname
    lastname
    phonenumber
    posts {
      nextToken
      __typename
    }
    followings {
      nextToken
      __typename
    }
    chats {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateUserSubscriptionVariables,
  APITypes.OnUpdateUserSubscription
>;
export const onDeleteUser = /* GraphQL */ `subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
  onDeleteUser(filter: $filter) {
    id
    email
    firstname
    lastname
    phonenumber
    posts {
      nextToken
      __typename
    }
    followings {
      nextToken
      __typename
    }
    chats {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteUserSubscriptionVariables,
  APITypes.OnDeleteUserSubscription
>;
export const onCreatePost = /* GraphQL */ `subscription OnCreatePost($filter: ModelSubscriptionPostFilterInput) {
  onCreatePost(filter: $filter) {
    id
    title
    content
    type
    createdAt
    userID
    user {
      id
      email
      firstname
      lastname
      phonenumber
      createdAt
      updatedAt
      __typename
    }
    updatedAt
    userPostsId
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreatePostSubscriptionVariables,
  APITypes.OnCreatePostSubscription
>;
export const onUpdatePost = /* GraphQL */ `subscription OnUpdatePost($filter: ModelSubscriptionPostFilterInput) {
  onUpdatePost(filter: $filter) {
    id
    title
    content
    type
    createdAt
    userID
    user {
      id
      email
      firstname
      lastname
      phonenumber
      createdAt
      updatedAt
      __typename
    }
    updatedAt
    userPostsId
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdatePostSubscriptionVariables,
  APITypes.OnUpdatePostSubscription
>;
export const onDeletePost = /* GraphQL */ `subscription OnDeletePost($filter: ModelSubscriptionPostFilterInput) {
  onDeletePost(filter: $filter) {
    id
    title
    content
    type
    createdAt
    userID
    user {
      id
      email
      firstname
      lastname
      phonenumber
      createdAt
      updatedAt
      __typename
    }
    updatedAt
    userPostsId
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeletePostSubscriptionVariables,
  APITypes.OnDeletePostSubscription
>;
export const onCreateFollowing = /* GraphQL */ `subscription OnCreateFollowing($filter: ModelSubscriptionFollowingFilterInput) {
  onCreateFollowing(filter: $filter) {
    id
    userID
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateFollowingSubscriptionVariables,
  APITypes.OnCreateFollowingSubscription
>;
export const onUpdateFollowing = /* GraphQL */ `subscription OnUpdateFollowing($filter: ModelSubscriptionFollowingFilterInput) {
  onUpdateFollowing(filter: $filter) {
    id
    userID
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateFollowingSubscriptionVariables,
  APITypes.OnUpdateFollowingSubscription
>;
export const onDeleteFollowing = /* GraphQL */ `subscription OnDeleteFollowing($filter: ModelSubscriptionFollowingFilterInput) {
  onDeleteFollowing(filter: $filter) {
    id
    userID
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteFollowingSubscriptionVariables,
  APITypes.OnDeleteFollowingSubscription
>;
export const onCreateUserChat = /* GraphQL */ `subscription OnCreateUserChat($filter: ModelSubscriptionUserChatFilterInput) {
  onCreateUserChat(filter: $filter) {
    id
    userID
    chatID
    user {
      id
      email
      firstname
      lastname
      phonenumber
      createdAt
      updatedAt
      __typename
    }
    chat {
      id
      createdAt
      updatedAt
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateUserChatSubscriptionVariables,
  APITypes.OnCreateUserChatSubscription
>;
export const onUpdateUserChat = /* GraphQL */ `subscription OnUpdateUserChat($filter: ModelSubscriptionUserChatFilterInput) {
  onUpdateUserChat(filter: $filter) {
    id
    userID
    chatID
    user {
      id
      email
      firstname
      lastname
      phonenumber
      createdAt
      updatedAt
      __typename
    }
    chat {
      id
      createdAt
      updatedAt
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateUserChatSubscriptionVariables,
  APITypes.OnUpdateUserChatSubscription
>;
export const onDeleteUserChat = /* GraphQL */ `subscription OnDeleteUserChat($filter: ModelSubscriptionUserChatFilterInput) {
  onDeleteUserChat(filter: $filter) {
    id
    userID
    chatID
    user {
      id
      email
      firstname
      lastname
      phonenumber
      createdAt
      updatedAt
      __typename
    }
    chat {
      id
      createdAt
      updatedAt
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteUserChatSubscriptionVariables,
  APITypes.OnDeleteUserChatSubscription
>;
export const onCreateChat = /* GraphQL */ `subscription OnCreateChat($filter: ModelSubscriptionChatFilterInput) {
  onCreateChat(filter: $filter) {
    id
    messages {
      nextToken
      __typename
    }
    createdAt
    participants {
      nextToken
      __typename
    }
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateChatSubscriptionVariables,
  APITypes.OnCreateChatSubscription
>;
export const onUpdateChat = /* GraphQL */ `subscription OnUpdateChat($filter: ModelSubscriptionChatFilterInput) {
  onUpdateChat(filter: $filter) {
    id
    messages {
      nextToken
      __typename
    }
    createdAt
    participants {
      nextToken
      __typename
    }
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateChatSubscriptionVariables,
  APITypes.OnUpdateChatSubscription
>;
export const onDeleteChat = /* GraphQL */ `subscription OnDeleteChat($filter: ModelSubscriptionChatFilterInput) {
  onDeleteChat(filter: $filter) {
    id
    messages {
      nextToken
      __typename
    }
    createdAt
    participants {
      nextToken
      __typename
    }
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteChatSubscriptionVariables,
  APITypes.OnDeleteChatSubscription
>;
export const onCreateMessage = /* GraphQL */ `subscription OnCreateMessage($filter: ModelSubscriptionMessageFilterInput) {
  onCreateMessage(filter: $filter) {
    id
    content
    senderID
    sender {
      id
      email
      firstname
      lastname
      phonenumber
      createdAt
      updatedAt
      __typename
    }
    chatID
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateMessageSubscriptionVariables,
  APITypes.OnCreateMessageSubscription
>;
export const onUpdateMessage = /* GraphQL */ `subscription OnUpdateMessage($filter: ModelSubscriptionMessageFilterInput) {
  onUpdateMessage(filter: $filter) {
    id
    content
    senderID
    sender {
      id
      email
      firstname
      lastname
      phonenumber
      createdAt
      updatedAt
      __typename
    }
    chatID
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateMessageSubscriptionVariables,
  APITypes.OnUpdateMessageSubscription
>;
export const onDeleteMessage = /* GraphQL */ `subscription OnDeleteMessage($filter: ModelSubscriptionMessageFilterInput) {
  onDeleteMessage(filter: $filter) {
    id
    content
    senderID
    sender {
      id
      email
      firstname
      lastname
      phonenumber
      createdAt
      updatedAt
      __typename
    }
    chatID
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteMessageSubscriptionVariables,
  APITypes.OnDeleteMessageSubscription
>;