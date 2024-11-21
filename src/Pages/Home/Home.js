import {useCookies} from 'react-cookie';
import {Navigate} from 'react-router-dom';

export default function Home() {
  const [cookies] = useCookies(['token']);
  if(cookies?.token) {
    return <Navigate to={'/shop'}/>
  } else {
    return <Navigate to={'/sign'} />
  }
}