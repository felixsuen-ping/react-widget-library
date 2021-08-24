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
    if (invokeReCaptcha)
      options = { ...options, invokeReCaptcha: invokeReCaptcha, checkRecaptcha: "checkRecaptcha" };
    if (grecaptcha)
      options = { ...options, grecaptcha: grecaptcha };
    if (props.deviceProfileScript)
      options = { ...options, deviceProfileScript: props.deviceProfileScript };
    console.log(options);

    authnWidget = new AuthnWidget(props.baseUrl, options);
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