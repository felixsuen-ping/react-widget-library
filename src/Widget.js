import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import AuthnWidget from "@ping-identity/pf-authn-js-widget";

export const Widget = (props) => {

  var authnWidget;

  function checkRecaptcha(token) {
    console.log('captcha response: ' + token);
    if (token.length === 0) {
        //reCaptcha not verified
        authnWidget.clearPendingState();
        console.log('did not pass captcha try again');
    } else {
        authnWidget.dispatchPendingState(token);
    }
}

  function invokeReCaptcha() {
      console.log(this.props.grecaptcha);
      let token = this.props.grecaptcha.getResponse();
      if (token) {
          checkRecaptcha(token);
      }
      else {
          this.props.grecaptcha.execute();
      }
  }

  useEffect(() => {
    // creating the options object
    let options = { divId: "authnwidget" };
    if (props.flowId)
      options = { ...options, flowId: props.flowId };
    if (props.logo)
      options = { ...options, logo: props.logo };
    if (props.invokeReCaptcha)
      options = { ...options, invokeReCaptcha: {invokeReCaptcha} };
    if (props.checkRecaptcha)
      options = { ...options, checkRecaptcha: "checkRecaptcha" };
    if (props.grecaptcha)
      options = { ...options, grecaptcha: props.grecaptcha };
    if (props.deviceProfileScript)
      options = { ...options, deviceProfileScript: props.deviceProfileScript };
    console.log(options);

    var authnWidget = new AuthnWidget(props.baseUrl, options);
    if (props.redirectlessConfig)
      authnWidget.initRedirectless(props.redirectlessConfig);
    else
      authnWidget.init();
  }, [])
  return (<div id="authnwidget" />);
}

Widget.propTypes = {
  baseUrl: PropTypes.string.isRequired,
  flowId: PropTypes.string,
  logo: PropTypes.string,
  invokeReCaptcha: PropTypes.func,
  checkRecaptcha: PropTypes.string,
  grecaptcha: PropTypes.object,
  deviceProfileScript: PropTypes.string,
  redirectlessConfig: PropTypes.object,
}