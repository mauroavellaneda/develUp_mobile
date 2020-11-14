import React, { useState } from "react";
import { WebView, ActivityIndicator } from "react-native-webview";
import Subscription from "../modules/subscription";
import { useDispatch } from "react-redux";

const myHtmlFile = require("../assets/index.html");

const DeveluperSubscription = (props) => {
  const webviewRef = React.useRef(null);
  const dispatch = useDispatch();

  function LoadingIndicatorView() {
    return <ActivityIndicator color="#009b88" size="large" />;
  }



  async function onMessage(data) {
    if (data.nativeEvent.data === "paid") {
      const response = await Subscription.approved(props.route.params.id);
      dispatch({
        type: "AUTHENTICATE",
        payload: {
          authenticated: true,
          currentUser: {role: "develuper"},
        },
      });
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
