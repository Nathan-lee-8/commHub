import { useContext } from 'react';
import { View, Text } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import styles from '../styles/Styles';

//Update to get user data from authContext
const EditProfile = () => {
  const authContext = useContext(AuthContext);
  if(!authContext) {
    console.log("Auth context not defined");
    return null;
  }
  const { userId, userEmail, firstname, lastname } = authContext;

  return (
    <View style={styles.container}>
      <Text>Hi {firstname} {lastname} {"\n"} 
        User ID: {userId} {"\n"}
        User Email: {userEmail} </Text>
    </View>
  );
};

export default EditProfile;