import { useHistory } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import Cookies from 'js-cookie';
import { userLogin } from '../data/User';

function AdminRoute(props) {
  const auth = useRecoilValue(userLogin);
  const history = useHistory();

  if (!auth) {
    history.push('/login');
  }

  if (auth) {
    if (Cookies.get('role') === '2') {
      history.push('/cs/dashboard');
    }
  }

  return props.children;
}

export default AdminRoute;