const OAuthInfo = {
  local: {
    client: {
      id: "study-api",
      clientId: "client1",
      clientSecret: "client1pwd",
      accessTokenUri: "http://127.0.0.1:8082/oauth/token",
      userAuthorizationUri: "http://127.0.0.1:8082/oauth/authorize",
      checkAccessTokenUri: "http://127.0.0.1:8082/oauth/check_token",
      redirectUri: "http://127.0.0.1:3001/auth/callback",
      tokenName: "access_token",
      clientAuthenticationScheme: "form",
      scope: "read"
    },
    resource: {
      userInfoUri: "http://127.0.0.1:8082/me"
    }
  }
};

module.exports = OAuthInfo;
