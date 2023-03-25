// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Opening up App.js to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

// import * as React from 'react';
// import { Text, View } from 'react-native';
// import * as Device from 'expo-device';

// export default function App() {
//   return (
//     <View style={{ flex: 1, paddingTop: 100 }}>
//       <Text>
//         {Device.manufacturer}: {Device.modelName}
//       </Text>
//     </View>
//   );
// }

import * as React from "react";
import { WebView } from "react-native-webview";
import { StatusBar } from 'expo-status-bar';

// To keep splash screen for longer
// import * as SplashScreen from 'expo-splash-screen';

// SplashScreen.preventAutoHideAsync();
// setTimeout(SplashScreen.hideAsync, 5000);

export default class App extends React.Component {
  render() {
    return (
      <>
        <StatusBar
          animated={true}
          backgroundColor="#111111"
        />
        <WebView
          source={{ uri: "https://greddiit.vercel.app/" }}
          style={{ marginTop: 20 }}
        />
      </>
    );
  }
}
