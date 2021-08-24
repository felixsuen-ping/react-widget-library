# widget-react

> Made with create-react-library

[![NPM](https://img.shields.io/npm/v/widget-react.svg)](https://www.npmjs.com/package/widget-react) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

# PingFederate Configuration

PingFederate acts as the server interacting with the widget via APIs to authenticate the user.

To configure PingFederate for the widget:
  1. First enable the authentication API: Authentication > Authentication API Applications > Enable Authentication API.
  2. Then, add an application by clicking the "Add Authentication Application" button and entering the appropriate values. For example: **Name:** TestApp, **URL:** `https://localhost:3000`.
  3. Click "Save".
  
  **Caution:** setting your Authentication Application as the "Default Authentication Application" will make it the default authentication for all of your existing connections. This is the easiest way to configure your connections, but it
  is not very precise. For more precision, configure the desired authentication policies to use your Authentication API Application.
  
  4. Select your newly created Authentication Application ("TestApp" if you used the example above) in the drop-down in the "Default Authentication Application" section.
  5. Start the SSO flow as you would normally. For example, by clicking on an existing IdP Connection, and you will be redirected to your "JavaScript Widget for the PingFederate Authentication API" application.

**Note:** The redirect URL of the [Authentication Applications](https://docs.pingidentity.com/csh?Product=pf-latest&topicname=ldc1564002999116.html) must point to where the JavaScript Widget for the PingFederate Authentication API is hosted.
If you do not wish to use the development server provided by webpack, change the URL of the authentication application to point the correct hosted URL.

## Install

```bash
npm install --save widget-react
```

## Configuring index.html
Inside your React application, locate the `public/index.html` file and paste in the following contents.

```html
<html>
  
<head>
  <title>Authentication API Sample App</title>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <link rel="stylesheet" type="text/css" href="https://assets.pingone.com/ux/end-user/0.36.1/end-user.css">
  <link rel="stylesheet" type="text/css" href="./main-styles.css">
  <script src="./index.js" defer="true"></script>
</head>

<body>
  <div class="content" style="padding: 30px">
    <div class="heading">Authentication Application</div>
    <div id="root"></div>
  </div>
</body>

</html>
```

## Basic Usage
The Authentication Widget component can be initialized using the following code example. The only required props is the PingFederate's base URL. 

```jsx
import React, { Component } from 'react'

import Widget from 'widget-react'

class Example extends Component {
  render() {
    return <Widget baseUrl="https://localhost:9031"/>
  }
}
```

## Optional Props
Here are all the available constructor parameters, their descriptions, and a usage code example:
  - **baseUrl**: full address of where PingFederate is running, such as https://localhost:9031
  - **divId**: where the widget should be rendered (Optional)
  - **logo**: to display on top of every page (Optional, this can be passed in as a file or as the URL where the image is hosted)
  - **useActionParam**: By default the widget uses a custom content type to request authentication API actions. If this flag is set to true, the widget instead uses a query parameter, which may be required in environments where custom content types are blocked. This query parameter is only supported for version 10.2 of PingFederate and later. (Optional)

```jsx
<Widget 
    baseUrl="https://localhost:9031" 
    divId="mywidget" 
    logo="https://path-to-my-logo.svg" 
    useActionParam={true}
/>
```

## Enabling Recaptcha
To use Captcha with the HTML Form Adapter, configure some additional scripts inside the `head` tags of `index.html`. This should include 2 functions that executes the grecaptcha object, and a script that imports the grecaptcha object from Google's CDN. 
```html
  <script>  
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
      console.log(grecaptcha);
      let token = grecaptcha.getResponse();
      if (token) {
          checkRecaptcha(token);
      } else {
        grecaptcha.execute();
      }
  }
  </script>
  <script src="https://www.google.com/recaptcha/api.js"></script>
```

## License

MIT © [felixsuen-ping](https://github.com/felixsuen-ping)
