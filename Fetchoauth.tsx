import { useAuth } from './Auth';

const fetchOAuth = (url: string) => {
    const auth = useAuth()

    return fetch(
      url,
      {
        headers:
        {
          "Authorization": 'bearer ' + auth.state.accessToken,
        }
      }
    )
}

export default fetchOAuth