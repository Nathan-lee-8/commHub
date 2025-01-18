import{ User, UserChat } from '../API';

export type SignInParamList = {
    SignIn: undefined;
    SignUp: undefined;
    Verify: {password: string};
    ResetPassword: undefined;
};

export type SignInTopTabParamList = {
    SignInRoute: undefined;
    SignUpRoute: undefined;
}

export type GlobalParamList = {
    MainTabs: undefined;
    ViewProfile: {user: User};
    ViewFollowing: {userID: string};
    ChatRoom: { userChat: UserChat};
    CreateChat: { user: User};
    CreateGroup: undefined;
}

export type LoggedInParamList = {
    HomeTopNav: undefined;
    Messaging: undefined;
    CreatePost: undefined;
    Groups: undefined;
    Profile: undefined;
};

export type TopTabParamList = { 
    Market: { category: string};
    Jobs: { category: string};
    Volunteer: { category: string};
}

export type PostsTopTabParamList = { 
    Market: { category: string, userID: string};
    Jobs: { category: string, userID: string};
    Volunteer: { category: string, userID: string};
}

export type Participant = {
    __typename: "UserChat";
    user?: {
      __typename: "User";
      id: string,
      firstname?: string | null;
      lastname?: string | null;
      profileURL?: string | null;
    } | null;
} | null;