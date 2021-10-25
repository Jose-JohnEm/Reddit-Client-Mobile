import React, { useState, useEffect, createContext, useContext } from "react";
import { authorize, revoke } from 'react-native-app-auth';

const config =
{
  redirectUrl: 'com.redditech.auth://oauth2redirect/reddit',
  clientId: 'J3wD24v0xSwSgWHTPsYMFg',
  clientSecret: '', // empty string - needed for iOS
  scopes: ['identity identity edit flair history modconfig modflair modlog modposts modwiki mysubreddits privatemessages read report save submit subscribe vote wikiedit wikiread'],
  duration: 'permanent',
  serviceConfiguration: {
    authorizationEndpoint: 'https://www.reddit.com/api/v1/authorize.compact',
    tokenEndpoint: 'https://www.reddit.com/api/v1/access_token',
    revocationEndpoint: 'https://www.reddit.com/api/v1/revoke_token'
  },
  customHeaders: {
    token: {
      Authorization: 'SjN3RDI0djB4U3dTZ1dIVFBzWU1GZw==',
    },
  },
};

const authContext = createContext(
  {
    state: {
      hasLoggedInOnce: false,
      accessToken: '',
      accessTokenExpirationDate: '',
      refreshToken: '',
    },
    authorizeAccount: () => { console.log("authorizeAccount is not set") },
    revokeAccount: () => { console.log("revokeAccount is not set") },
  }
);

export function ProvideAuth({ children }: { children: any }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};


export function useProvideAuth() {
  const [state, setState] = useState(
    {
      hasLoggedInOnce: false,
      accessToken: '',
      accessTokenExpirationDate: '',
      refreshToken: '',
    },
  )

  const authorizeAccount = () => {
    authorize(config).then(
      (newAuthState) => {
        setState(
          {
            hasLoggedInOnce: true,
            accessToken: newAuthState.accessToken,
            accessTokenExpirationDate: newAuthState.accessTokenExpirationDate,
            refreshToken: newAuthState.refreshToken,
          }
        )
      },
      (message) => {
        console.log('User refused to log in :', message)
      }
    ).catch(
      (error) => {
        console.log('Failed to log in :', error.message)
      }
    )
  }

  const revokeAccount = () => {
    revoke(config, { tokenToRevoke: state.accessToken, sendClientId: true }).then(
      () => {
        setState(
          {
            hasLoggedInOnce: state.hasLoggedInOnce,
            accessToken: '',
            accessTokenExpirationDate: '',
            refreshToken: '',
          }
        )
      },
      (message) => {
        console.log('User refused to revoke the token :', message)
      }
    ).catch(
      (error) => {
        console.log('Failed to revoked the token :', error)
      }
    )
  }

  // useEffect(() => {
  //   setState(
  //     {
  //       hasLoggedInOnce: state.hasLoggedInOnce,
  //       accessToken: state.accessToken,
  //       accessTokenExpirationDate: state.accessTokenExpirationDate,
  //       refreshToken: state.refreshToken
  //     }
  //   )
  // }, [])

  return {
    state,
    authorizeAccount,
    revokeAccount,
  };
}
