import React from 'react';
import {View, Text,StyleSheet,Dimensions} from 'react-native';


// const Profile = () => {
//   return (
//     <View>
//       <Text>Profile</Text>
//     </View>
//   );
// };



import PanoramaView from "@lightbase/react-native-panorama-view";

const Profile = () => (
  <View style={styles.container}>
    <PanoramaView
      style={styles.viewer}
      dimensions={{ height: 450, width: Dimensions.get("window").width }}
      inputType="mono"
      imageUrl="https://www.airpano.com/files/taj_mahal_03.jpg"
    />
        {/* <PanoramaView
      style={styles.viewer}
      dimensions={{ height: 230, width: Dimensions.get("window").width }}
      inputType="mono"
      imageUrl="https://www.airpano.com/files/taj_mahal_03.jpg"
    />
        <PanoramaView
      style={styles.viewer}
      dimensions={{ height: 230, width: Dimensions.get("window").width }}
      inputType="mono"
      imageUrl="https://www.airpano.com/files/taj_mahal_03.jpg"
    /> */}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewer: {
    height: '100%',
  },
});

export default Profile;