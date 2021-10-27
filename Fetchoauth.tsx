import { useAuth } from './Auth';

function fetchOAuth(url: string): Promise<Response> {
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