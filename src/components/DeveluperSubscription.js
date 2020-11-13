import React, { useState } from "react";
import { WebView, ActivityIndicator } from "react-native-webview";
import Subscription from '../modules/subscription'

const myHtmlFile = require("../assets/index.html");

const DeveluperSubscription = (props) => {
  const webviewRef = React.useRef(null);
  function LoadingIndicatorView() {
    return <ActivityIndicator color="#009b88" size="large" />;
  }

  async function  onMessage(data) {
    if(data.nativeEvent.data === "paid")
    {
      const response = await Subscription.approved(props.route.params.id);
    }
    props.navigation.navigate("develUp");
  }
  return (
    <>
      <WebView
        source={myHtmlFile}
        renderLoading={LoadingIndicatorView}
        ref={webviewRef}
        onMessage={onMessage}
      />
    </>
  );
};

export default DeveluperSubscription;
