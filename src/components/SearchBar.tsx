import { useEffect, useState, useContext } from 'react';
import { View, TextInput, FlatList, TouchableOpacity, Button,
  Text, Image, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FindUserParamList } from '../types/rootStackParamTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import filter from 'lodash/filter';
import client  from '../client';
import { listUsers } from '../graphql/queries';
import { AuthContext } from '../context/AuthContext';
import styles from '../styles/Styles';
import { User } from '../API';
import ProfilePicture from './ProfilePicture';

const SearchBar = ( { screen, handleSendMessage } : any) => {
    const [search, setSearch] = useState<string>('');
    const [data, setData] = useState<User[]>([]);
    const [filteredData, setFilteredData] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const currUserId = useContext(AuthContext)?.userId;

    const fetchUsers = async () => {
      try{
        const users = await client.graphql({
          query: listUsers,
          variables: { limit: 100 }
        });
        const userData = users.data.listUsers.items;
        setData(userData);
        await AsyncStorage.setItem('usersCache', JSON.stringify({userData: userData}));
        console.log('Fetched & cached from fetchusers.', userData);
      } catch (error) {
        console.log('Error fetching users', error);
      }
    };
    useEffect(() => {
        const initializeCache = async () => {
          setLoading(true);
          try {
            const cachedData = await AsyncStorage.getItem('usersCache');
            if (cachedData) {
              const parsedData = JSON.parse(cachedData).userData;
              setData(parsedData);
            } else {
              await fetchUsers();
            }
          } catch (error) {
            console.log('Error initializing cache', error);
          } finally {
            setLoading(false);
          }
        };
        initializeCache();
      }, []);
    
    const handleSearch = async (query: string) => {
        setSearch(query);
        if(!query){
          setFilteredData([]);
          return;
        }
        const formattedSearch = query.toLowerCase();
        const results = filter(data, (user) => {
          if(user.id === currUserId){
            return false;
          }
          return user.firstname && user.firstname.toLowerCase().includes(formattedSearch) || 
            user.email.toLowerCase().includes(formattedSearch)
        });
        setFilteredData(results);
    };
    
    const navigation = useNavigation<NativeStackNavigationProp<FindUserParamList, 'ViewProfiles'>>();
    const handleViewProfile = (user: User) => {
        navigation.navigate('ViewProfiles', { user: user });
    }
    
    const resetCache = async () => {
        await AsyncStorage.removeItem('usersCache');
        fetchUsers();
    }
    
    if (loading) {
        return (
          <View >
            <ActivityIndicator size="large" color="#0000ff" />
            <Text>Loading...</Text>
          </View>
        );
    }
    
    return (
        <View>
            <TextInput
            style={styles.input}
            value={search}
            onChangeText={handleSearch}
            placeholder="Search for users..."
            autoCapitalize='none'
            autoCorrect={false}
            clearButtonMode='always'
            />
            <FlatList
            data={filteredData}
            keyExtractor={(item) => item.email}
            renderItem={({ item }) => {
              if(item.profileURL == null){
                item.profileURL = undefined;
              }
              return (
                <View style={styles.listUserContainer}>
                <ProfilePicture uri={item.profileURL} size={50}/>
                <View>
                    <Text style={styles.textName}>{item.firstname} {item.lastname}</Text>
                    <Text style={styles.textEmail}>{item.email}</Text>
                </View>
                  {screen === 'findUser' &&
                      <TouchableOpacity style={styles.button} onPress={() => handleViewProfile(item)}>
                          <Text style={styles.buttonText}>Profile</Text>
                      </TouchableOpacity>
                  }
                  {screen === 'messaging' &&
                      <TouchableOpacity style={styles.button} onPress={() => handleSendMessage(item)}>
                          <Text style={styles.buttonText}>Msg</Text>
                      </TouchableOpacity>
                  }
                </View>
            )}}
            />
            <Button title="Reset User Cache" onPress={resetCache}/>
        </View>
    );
};

export default SearchBar;