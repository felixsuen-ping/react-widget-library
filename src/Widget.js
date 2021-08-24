import React, { useEffect } from "react";
import PropTypes from "prop-types";
import AuthnWidget from "@ping-identity/pf-authn-js-widget";

export const Widget = (props) => {

  useEffect(() => {
    let options = { divId: "authnwidget" };
    if (props.flowId)
      options = { ...options, flowId: props.flowId };
    if (props.logo)
      options = { ...options, logo: props.logo };
    // enable recaptcha
    if (typeof invokeReCaptcha !== 'undefined')
      options = { ...options, invokeReCaptcha: invokeReCaptcha, checkRecaptcha: "checkRecaptcha" };
    if (typeof grecaptcha !== 'undefined')
      options = { ...options, grecaptcha: grecaptcha };
    if (props.useActionParam)
      options = { ...options, useActionParam: true };
    if (props.deviceProfileScript)
      options = { ...options, deviceProfileScript: props.deviceProfileScript };
    console.log(options);

    if (typeof window.authnWidget !== undefined || window.authWidget == null) {
      // if authnWidget is already initialized globally
      window.authnWidget = new AuthnWidget(props.baseUrl, options);
      if (props.redirectlessConfig)
        window.authnWidget.initRedirectless(props.redirectlessConfig);
      else
        window.authnWidget.init();
    } else {
      // initialize authnWidget
      var authnWidget = new AuthnWidget(props.baseUrl, options);
      if (props.redirectlessConfig)
        authnWidget.initRedirectless(props.redirectlessConfig);
      else
        authnWidget.init();
    }
    
  }, [])
  return (<div id="authnwidget" />);
}

Widget.propTypes = {
  baseUrl: PropTypes.string.isRequired,
  flowId: PropTypes.string,
  logo: PropTypes.string,
  useActionParam: PropTypes.bool,
  deviceProfileScript: PropTypes.string,
  redirectlessConfig: PropTypes.object,
}