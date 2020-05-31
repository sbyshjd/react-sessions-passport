import { useHistory } from 'react-router-dom';
export default function useSaveAndRedirect() {
  const history = useHistory();
  return (token) => {
    localStorage.setItem('@pocpassaport', JSON.stringify(token));
    history.push('/');
  };
}
