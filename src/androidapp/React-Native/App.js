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
import { useNetInfo } from "@react-native-community/netinfo";
import { Text, View } from 'react-native';

// To keep splash screen for longer
// import * as SplashScreen from 'expo-splash-screen';

// SplashScreen.preventAutoHideAsync();
// setTimeout(SplashScreen.hideAsync, 5000);

function App() {
  const netInfo = useNetInfo();

  return (
    <>
      <StatusBar
        animated={true}
      // backgroundColor="#FFF"
      />
      {/* <View style={{  paddingTop: 50 }}>
        <Text>Type: {netInfo.type}</Text>
        <Text>Is Connected? {(netInfo.isConnected || false).toString()} { (netInfo.isInternetReachable || false).toString()}</Text>
      </View> */}
      <WebView
        source={{ uri: "greddiit.vercel.app" }}
        // source={{ uri: "10.1.133.241:80" }}
        style={{ marginTop: 25 }}
        setBuiltInZoomControls={false}
        javaScriptEnabled
        overScrollMode="never"
        sharedCookiesEnabled={true}
        scalesPageToFit={true}
        textZoom={100}
      />
    </>
  );
}

export default App;