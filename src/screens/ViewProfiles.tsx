import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/Styles';
import UserPosts from '../components/UserPosts';
import ProfilePicture from '../components/ProfilePicture';

const ViewProfiles = ( { route, navigation } : any) => {
    const user = route.params?.user;
    if(!user) return (<View><Text>Error: User not found</Text></View>);
    console.log(user)

    const profileURL = user.profileURL === null ? undefined: user.profileURL;
    const creationDate = user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "unknown";
    
    const viewFollowing = () => {
        navigation.navigate('ViewFollowing', {userId: user.id});
    }

    const follow = async () => {

    }

    return(
        <View style={styles.container}>
            <View style={styles.profileSection}>
                <ProfilePicture uri={profileURL} size={100} />
                <View style={styles.textContainer}>
                    <Text style={styles.postAuthor}>{user.firstname} {user.lastname}</Text>
                    <Text style={styles.postContact}>{user.email}</Text>
                    <Text style={styles.postContact}>Phonenumber: {user.phonenumber}</Text>
                    <Text style={styles.postContact}>User since {creationDate}</Text>
                    <TouchableOpacity onPress={follow} style={styles.profileButton}>
                        <Text>Follow</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={follow} style={styles.profileButton}>
                        <Text>Message</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={viewFollowing} style={styles.following}>
                        <Text>Following: </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <UserPosts userID={user.id} />
        </View>
        
    )
}

export default ViewProfiles;