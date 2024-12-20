import { useContext } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { signOut } from 'aws-amplify/auth';
import SignIn from '../screens/SignInScreen';
import Home from '../screens/HomeScreen';
import CreatePost from '../screens/CreatePost';
import Verify from '../screens/Verify';
import FindUsers from '../screens/FindUsers';
import Messaging from '../screens/Messaging';
import EditProfile from '../screens/EditProfile';
import ResetPassword from '../screens/ResetPassword';
import ChatRoom from '../screens/ChatRoom';
import ViewProfiles from '../screens/ViewProfiles';
import CreateChat from '../screens/CreateChat';
import { RootStackParamList, SignedInTabParamList, MessagingStackParamList,
  FindUserParamList, TopTabParamList } from '../types/rootStackParamTypes';
import { AuthContext } from '../context/AuthContext';
import ProfilePicture from '../components/ProfilePicture';
import Icon from '@react-native-vector-icons/ionicons'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createBottomTabNavigator<SignedInTabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();
const MessageStack = createNativeStackNavigator<MessagingStackParamList>();
const FindUserStack = createNativeStackNavigator<FindUserParamList>();
const TopTabStack = createMaterialTopTabNavigator<TopTabParamList>();

const AppNavigator = () => {
  const authContext = useContext(AuthContext);
  if(!authContext) {
    console.log("Auth context not defined");
    return null;
  }
  const { isSignedIn, profileURL } = authContext;

  return (
    <NavigationContainer>
      {isSignedIn ? (
        <Tab.Navigator>
          <Tab.Screen name="HomeScreen" component={HomeTopNav} 
            options={{
              title: 'Home',
              tabBarIcon: () => <Icon name="home-outline" size={30} color="grey" />
            }}/>
          <Tab.Screen name="MessageScreens" component={MessageScreens} 
            options={{
              title: 'Messages', 
              headerShown: false,
              tabBarIcon: () => <Icon name="chatbubbles-outline" size={30} color="grey" />
              }} />
          <Tab.Screen name="CreatePost" component={CreatePost} 
            options={{
              title: 'Create Post',
              tabBarIcon: () => <Icon name="create-outline" size={30} color="grey" />
              }} />
          <Tab.Screen name="ProfileScreens" component={ProfileScreens} 
            options={{
              title: 'Search Users', 
              headerShown: false,
              tabBarIcon: () => <Icon name="search-outline" size={30} color="grey" />
              }} />
          <Tab.Screen name="EditProfile" component={EditProfile}
            options={{
              title: 'Edit Profile', 
              tabBarIcon: () => <ProfilePicture uri={profileURL}size={35}/>,
              headerRight: LogOutButton
            }} />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator initialRouteName="SignIn">
          <Stack.Screen name="SignIn" component={SignIn}
            options={{title: 'Sign In'}}  />
          <Stack.Screen name="Verify" component={Verify} />
          <Stack.Screen name="ResetPassword" component={ResetPassword} 
            options={{title: 'Reset Password'}} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

const HomeTopNav = () => {
  return (
    <TopTabStack.Navigator>
      <TopTabStack.Screen name="Market" component={Home} initialParams={{category: "Market"}}
        options={{title: 'Market'}} />
      <TopTabStack.Screen name="Jobs" component={Home} initialParams={{category: "Jobs"}}
        options={{title: 'Jobs'}} />
      <TopTabStack.Screen name="Volunteer" component={Home} initialParams={{category: "Volunteer"}}
        options={{title: 'Volunteer'}} />
    </TopTabStack.Navigator>
  )
}

const MessageScreens = () => {
  return (
    <MessageStack.Navigator initialRouteName='Messaging' >
      <MessageStack.Screen name="Messaging" component={Messaging} 
        options={{title: 'Messages'}} />
      <MessageStack.Screen name="ChatRoom" component={ChatRoom} 
        options={{title: 'Messages'}}/>
      <MessageStack.Screen name="CreateChat" component={CreateChat}
        options={{title: 'Create New Chat'}}/>
    </MessageStack.Navigator>
  )
}

const ProfileScreens = () => {
  return (
    <FindUserStack.Navigator initialRouteName='FindUsers' >
      <FindUserStack.Screen name="FindUsers" component={FindUsers} 
        options={{title: 'Search User'}}/>
      <FindUserStack.Screen name="ViewProfiles" component={ViewProfiles} 
        options={{title: 'Profile'}}/>
    </FindUserStack.Navigator>
  )
}

//Button to handle logout logic
const LogOutButton = () => {
  const authContext = useContext(AuthContext);
  if(!authContext) {
    console.log("Auth context not defined");
    return null;
  }
  const { logout } = authContext;

  const handleSignOut = async () => {
    try{ 
      await signOut();
      logout();
    } catch (error) {
      console.log('error signing out: ', error);
    };
  };

  return (
      <TouchableOpacity style={styles.button} onPress={handleSignOut}>
          <Text style={styles.buttonText}>Log Out</Text>
      </TouchableOpacity>
  );
};

//Styles for LogOut button
const styles = StyleSheet.create({
  button: {
      padding: 10,
      backgroundColor: '#000', // Customize background color as needed
      borderRadius: 5, // Rounded corners
      marginRight: 10, // Add some margin to the right of the button
  },
  buttonText: {
      color: '#fff', // Text color
      fontSize: 16, // Font size
      fontWeight: 'bold', // Font weight
  },
});


export default AppNavigator;
