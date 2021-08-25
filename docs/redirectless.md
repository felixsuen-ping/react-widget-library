# Redirectless support
In PingFederate, you can configure mobile applications to authenticate through REST APIs as OAuth clients without needing to handle HTTP redirections. When authentication is complete, the applications receive an OAuth authorization code or access token, and possibly an OpenID Connect ID token.

Single-page web applications can also use redirectless mode if administrators configure them in PingFederate as authentication applications.
## PingFederate configuration
1. Follow the instructions at [README.md](../README.md#pingfederate-configuration) to configure the Authentication API in PingFederate.
1. In the administrative console, go to Applications > OAuth > Clients and add a new OAuth 2.0 client.
1. On the new client, select the 'Allow Authentication API OAuth Initiation' check box.
1. Select the 'Restrict Common Scopes' check box and the client's restricted scopes.
1. Select the client's 'Allowed Grant Types'.

## Usage
To use the redirectless flow:
- Create an instance of the widget by providing PingFederate's base URL and the necessary options.
- Create a `configuration` object to provide the necessary redirectless settings. 
- Call `initRedirectless` and pass the `configuration` object as an argument.

Here's an example: 
```javascript
var authnWidget = new PfAuthnWidget("https://localhost", { divId: 'authnwidget' });
var config = {
  client_id: 'test',
  response_type: 'token id_token',
  onAuthorizationSuccess: function (response) {
    console.log(response);
  }
};
authnWidget.initRedirectless(config);
```
## Configuration object
There are two options for creating the configuration object to initiate the redirectless flow:
1. Create a configuration object that contains the `onAuthorizationSuccess` function and the required attributes (such as `client_id`, `response_type`, etc.) used by the internal authorization request function.
1. Create a configuration object that contains the `onAuthorizationRequest` and `onAuthorizationSuccess` functions.

Use option 1 for most deployments. Use option 2 for advanced use-cases.

### `onAuthorizationRequest` function
This callback function is called during the authorization request. It has no arguments and it's expected to return a JavaScript `Promise`, which completes the authorization request call to PingFederate.
[PingAccess redirectless support](/docs/pingaccessRedirectless.md).

Here's an example:
```javascript
var config = {
  onAuthorizationRequest: function () {
    var url = 'https://localhost:9031/as/authorization.oauth2?client_id=test&response_type=token&response_mode=pi.flow'
    var options = {
      method: 'GET',
      credentials: 'include'
    }
    return fetch(url, options);
  }
}
```
The `options` attribute `credentials: 'include'` is required to ensure the browser correctly handles PingFederate's session cookie.

### `onAuthorizationSuccess` function
This callback function returns the result of the transaction to the webpage containing the Authentication API widget. The protocol response is passed to this function as the first argument when the Authentication API widget calls it.
[PingAccess redirectless support](/docs/pingaccessRedirectless.md).

Here is an example: 
```js
var config = {
  onAuthorizationSuccess: function (response) {
    console.log(response.access_token);
  }
};
```

### Supported attributes
The internal `onAuthorizationRequest` function supports the following attributes: `client_id`, `response_type`, `code_challenge`, `code_challenge_method`, `redirect_uri`, `scope`, `state`, `idp`, `pfidpadapterid`, `access_token_manager_id`, `aud`, `nonce`, `prompt`, `acr_values`, `max_age`, `login_hint`, `ui_locales`, `id_token_hint`, `claims_locales`. 

The `client_id` and `response_type` attributes are required if `onAuthorizationRequest` is not present. 

The key-value pairs will be appended to the authorization request URL, their values will be URL encoded, and arrays will be concatenated and URL encoded into one string.

## Configuration object examples
### OAuth 2.0 implicit
This code snippet demonstrates a simple OAuth 2.0 configuration used by the Authentication API widget redirectless flow.
```javascript
var config = {
  client_id: 'test',
  response_type: 'token',
  scopes: ['a', 'b', 'c'],
  onAuthorizationSuccess: function (response) {
    console.log(response.access_token);
  }
};
```
### OpenID Connect
This code snippet demonstrates a simple OpenID Connect configuration used by the Authentication API widget redirectless flow.
```javascript
var config = {
  scope: ['openid', 'profile', 'email', 'address', 'phone'],
  state: '3f05dd88-3e97-496f-ba04-50e36e7ee1a5', // must be generated per each request.
  client_id: 'test',
  response_type: 'id_token',
  onAuthorizationSuccess: function (response) {
    console.log(response.id_token);
  }
};
```
