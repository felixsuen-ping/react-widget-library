import React, { useEffect } from "react";
import PropTypes from "prop-types";
import AuthnWidget from "@ping-identity/pf-authn-js-widget";

export const Widget = (props) => {
  useEffect(() => {
    // creating the options object
    let options = { divId: "authnwidget" };
    if (props.flowId)
      options = { ...options, flowId: props.flowId };
    if (props.logo)
      options = { ...options, logo: props.logo };
    if (props.invokeReCaptcha)
      options = { ...options, invokeReCaptcha: props.invokeReCaptcha };
    if (props.checkRecaptcha)
      options = { ...options, checkRecaptcha: props.checkRecaptcha };
    if (props.grecaptcha)
      options = { ...options, grecaptcha: options.grecaptcha };
    if (props.deviceProfileScript)
      options = { ...options, deviceProfileScript: options.deviceProfileScript };
    console.log(options);

    const authnWidget = new AuthnWidget(props.baseUrl, options);
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