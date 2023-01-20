// import React from 'react';
// import {View, Text} from 'react-native';

// const Liked = () => {
//   return (
//     <View>
//       <Text>Liked</Text>
//     </View>
//   );
// };

// export default Liked;

import React from 'react';
import _ from 'lodash'
import {
  View,
  Dimensions
} from 'react-native';

import Image360Viewer from '@hauvo/react-native-360-image-viewer'

const { width, height } = Dimensions.get('window')
const images = _.reverse([
  require(`./iris-1.jpg`),
  require(`./iris-2.jpg`),
  require(`./iris-3.jpg`),
  require(`./iris-4.jpg`),
  require(`./iris-5.jpg`),
  require(`./iris-6.jpg`),
  require(`./iris-7.jpg`),
  require(`./iris-8.jpg`),
  require(`./iris-9.jpg`),
  require(`./iris-10.jpg`),
  require(`./iris-11.jpg`),
  require(`./iris-12.jpg`),
  require(`./iris-13.jpg`),
  require(`./iris-14.jpg`),
  require(`./iris-15.jpg`),
  require(`./iris-16.jpg`),
  require(`./iris-17.jpg`),
  require(`./iris-18.jpg`),
  require(`./iris-19.jpg`),
  require(`./iris-20.jpg`),
  require(`./iris-21.jpg`),
  require(`./iris-22.jpg`),
  require(`./iris-23.jpg`),
  require(`./iris-24.jpg`),
  require(`./iris-25.jpg`),
  require(`./iris-26.jpg`),
  require(`./iris-27.jpg`),
  require(`./iris-28.jpg`),
  require(`./iris-29.jpg`),
  require(`./iris-30.jpg`),
  require(`./iris-31.jpg`),
  require(`./iris-32.jpg`),
  require(`./iris-33.jpg`),
  require(`./iris-34.jpg`),
  require(`./iris-35.jpg`),
  require(`./iris-36.jpg`)
])

const Liked = () => {
  return (
    <View style={{ flex: 1 }}>
      <Image360Viewer srcset={images} width={width} height={height} />
    </View>
  );
};

export default Liked;