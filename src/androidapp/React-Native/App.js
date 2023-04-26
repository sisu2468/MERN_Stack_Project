import * as React from "react";
import { WebView } from "react-native-webview";
import { StatusBar } from 'expo-status-bar';

function App() {
    const INJECTED_JAVASCRIPT = `(function() {
     const meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta);
    })();`;

    return (
        <>
            <StatusBar
                animated={true}
                backgroundColor="#FFF"
            />
            <WebView
                source={{ uri: "https://greddiit.vercel.app" }}
                // source={{ uri: "http://10.1.133.241:80/" }}
                style={{ marginTop: 30 }}
                setBuiltInZoomControls={false}
                javaScriptEnabled
                injectedJavaScript={INJECTED_JAVASCRIPT}
                sharedCookiesEnabled={true}

                overScrollMode="never"
                scalesPageToFit={false}
                bounces={false}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                // scrollEnabled={false}
            />
        </>
    );
}

export default App;