import { useHistory } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import Cookies from 'js-cookie';
import { userLogin } from '../data/User';

function Authenticated(props) {
  const auth = useRecoilValue(userLogin);
  const history = useHistory();

  if (auth) {
    if (Cookies.get('role') === 'admin') {
      history.push('/admin/dashboard');
    } else if (Cookies.get('role') === 'user') {
      history.push('/user');
    }
  }
  console.log(Cookies.get('role'));

  return props.children;
}

export default Authenticated;