import { useHistory } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import Cookies from 'js-cookie';
import { userLogin } from '../data/User';

function UserRoute(props) {
  const auth = useRecoilValue(userLogin);
  const history = useHistory();

  if (!auth) {
    history.push('/login');
  }

  if (auth) {
    if (Cookies.get('role') === '1') {
      history.push('/');
    } else if (Cookies.get('role') === '2') {
      history.push('/cs/dashboard/start');
    }
  }

  return props.children;
}

export default UserRoute;