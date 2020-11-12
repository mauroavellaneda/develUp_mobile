import React, { useState } from "react";
import { WebView, ActivityIndicator } from "react-native-webview";

const myHtmlFile = require("../assets/index.html");


const DeveluperSubscription = () => {
  // const [onMessage, setMessage] = useState("");
  const webviewRef = React.useRef(null);
  function LoadingIndicatorView() {
    return (
      <ActivityIndicator
        color="#009b88"
        size="large"
      />
    );}

  function onMessage(data) {
    alert(data.nativeEvent.data);
    console.log(data.nativeEvent.data);
    // props.navigation.navigate("develUp");
  }
  return (
    <>
      <WebView source={myHtmlFile}
         renderLoading={LoadingIndicatorView}
        //  startInLoadingState={true}
          ref={webviewRef}
          onMessage={onMessage}
          />

    </>
  );
};

export default DeveluperSubscription;
