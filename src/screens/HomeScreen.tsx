import { useEffect, useState, useContext, useCallback } from 'react';
import { View, Text, FlatList, ActivityIndicator, RefreshControl,
  TouchableOpacity } from 'react-native';
import client from '../client';
import { groupsByUser, userByEmail } from '../graphql/queries';
import { ModelSortDirection, Post, Group } from '../API';
import { AuthContext } from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/Styles';
import ProfilePicture from '../components/ProfilePicture';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { GlobalParamList, LoggedInParamList } from '../types/rootStackParamTypes';

/**
 * Displays the active HomeScreen for the current user including:
 * The News feed which has the current active news feed for user
 * A tab view at the bottom which allows users to: create a post, 
 *    view feed, edit profile, find other users and send messages
 */
const HomeScreen = () => {
  const authContext = useContext(AuthContext);
  if(!authContext) {
    console.log("Auth context not defined");
    return null;
  };
  const { userId, userEmail, firstname, lastname, setProfileURL,
     setUserId, setFirstName, setLastName } = authContext;

  let headerName = userEmail;
  if(firstname) headerName = firstname;
  if(lastname) headerName += ' ' + lastname;

  const [newsFeed, setNewsFeed] = useState<Post[]>([]);
  const [groups, setGroups] = useState<Group[]>([])
  const [loading, setLoading] = useState(true);
  
  //Reset Cache if it was cleared but user is still logged in
  useEffect(() => {
    if(userId != '') return;
    const fetchUserId = async () => {
      const cachedUser = await AsyncStorage.getItem('currUser');
      if(cachedUser) {
        const user = JSON.parse(cachedUser);
        if(user.id) setUserId(user.id);
        if(user.firstname) setFirstName(user.firstname);
        if(user.lastname) setLastName(user.lastname);
        if(user.profileURL) setProfileURL(user.profileURL);
      }
      try{
        const data = await client.graphql({
          query: userByEmail,
          variables: { email: userEmail.toLowerCase() },
        });
        const user = data.data.userByEmail.items[0];
        AsyncStorage.setItem('currUser', JSON.stringify(user));
        console.log('Fetched current user & set cache'); //REMOVE 
        setUserId(user.id);
        if (user.firstname) setFirstName(user.firstname);
        if (user.lastname) setLastName(user.lastname);
      } catch (error: any) {
        if(error.messsage) console.log('Error fetching user ID', error.message);
        else if(error.errors) console.log('Error fetching user ID', error.errors);
        else console.log('Error fetching user ID', error);
      }
    };
    fetchUserId();
  }, []);

  useEffect(()=> {
    const loadNewsFeed = async () => {
      try {
        const cachedData = await AsyncStorage.getItem('newsFeedCache');
        if (cachedData) {
          const data = JSON.parse(cachedData);
          //const fiveMin = 5 * 60 * 1000;
          //if (Date.now() - data.timestamp < fiveMin) {
            setNewsFeed(data.posts);
            setLoading(false);
            return;
          //}
        }else{
          await fetchNewsFeed();
        }
      } catch (error) {
        console.log('Error loading cached news feed', error);
      }
    };
    loadNewsFeed();
  }, []);

  const fetchNewsFeed = async () => { 
    setLoading(true);
    try{
      const res = await client.graphql({
        query: groupsByUser,
        variables: {
          userID: userId,
          sortDirection: ModelSortDirection.DESC,
        },
        authMode: 'userPool'
      }); 
      const userGroupData = res.data.groupsByUser.items;
      let groupData = userGroupData.flatMap(group => {
        return (group.group  || []);
      });
      setGroups(groupData.filter(group => group !== null))
      
      let posts = userGroupData.flatMap(userGroup => {
        return (userGroup.group?.posts?.items || []).filter(post => post !== null);
      })
      posts = posts.sort((a, b) => {
        const dateA = a?.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b?.createdAt ? new Date(b.createdAt).getTime() : 0;
        return dateB - dateA;
      });
      console.log(`Fetched from fetchnewsfeed.`);
      setNewsFeed(posts);
      
      await AsyncStorage.setItem('newsFeedCache', JSON.stringify({
        posts,
        timestamp: Date.now(),
      }));
    } catch (error: any) {
      if(error.messsage) console.log('Error fetching news feed', error.message);
      else if(error.errors) console.log('Error fetching news feed', error.errors);
      else console.log('Error fetching news feed', error);
    } finally {
      setLoading(false);
    }
  };

  const navigation = useNavigation<NativeStackNavigationProp<GlobalParamList>>();
  const nav2 = useNavigation<NativeStackNavigationProp<LoggedInParamList>>();
  const visitProfile = (item : any) => {
    if(item.user.id === userId){
      nav2.navigate('Profile');
    }else{
      navigation.navigate('ViewProfile', { user: item.user });
    }
  }

  const getGroupName = ( id : string) => {
    const res = groups.flatMap(group => {
      if(group.id === id){
        return group.groupName;
      }
    })
    return res;
  }

  const onRefresh = useCallback(() => {
    fetchNewsFeed();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={newsFeed}
          renderItem={({ item }) => {
            let firstname = item?.user?.firstname ? item.user.firstname : undefined;
            let lastname = item?.user?.lastname ? item.user.lastname: undefined;
            let displayEmail = item?.user?.email ? item.user.email : undefined ;
            let profileURL = item?.user?.profileURL ? item.user.profileURL : undefined;
            var groupName = getGroupName(item.groupID);
            return (
              <View style={styles.postContainer}>
                <View style={styles.profileSection}> 
                  <TouchableOpacity onPress={() => visitProfile(item)}>
                    <ProfilePicture uri={profileURL} size={35} />
                  </TouchableOpacity>
                  <View style={styles.textContainer}>
                    <Text style={styles.postAuthor}>{firstname + " " + lastname}</Text>
                    <Text style={styles.postContact}>{displayEmail}</Text>
                  </View>
                </View>
                <Text style={styles.postGroup}> {groupName}</Text>
                <Text style={styles.postDate}>{moment(item.createdAt).fromNow()}</Text>
                <Text style={styles.postTitle}>{item.title}</Text>
                <Text style={styles.postContent}>{item.content}</Text>
              </View>
            )
          }}
          ListEmptyComponent={() => (
            <View>
              <Text>New To DAP? Create or join a Group to get started!</Text>
            </View>
          )}
          refreshControl={
            <RefreshControl
                refreshing={loading}
                onRefresh={onRefresh}
                colors={['#9Bd35A', '#689F38']}  // Customize loading spinner color
                progressBackgroundColor="#ffffff" // Background color of the spinner
            />
          }
        />
      )}
    </View>
    
  );
};

export default HomeScreen;
