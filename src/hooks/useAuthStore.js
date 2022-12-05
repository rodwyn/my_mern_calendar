import { useDispatch, useSelector } from 'react-redux';
import { calendarAPI } from '../api';
import { clearErrorMessage, onChecking, onLogin, onLogout } from '../store/auth/authSlice';

export const useAuthStore = () => {
  const { status, user, errorMessage } = useSelector( state => state.auth );
  const dispatch = useDispatch();

  const startLogin = async({ email, password }) => {
    dispatch( onChecking() );
    try {
      const { data } = await calendarAPI.post('/auth', { email, password });
      localStorage.setItem('token', data.token);
      localStorage.setItem('token_init_date', new Date().getTime());
      dispatch( onLogin({ name: data.name, uid: data.uid }) );
    } catch (error) {
      console.log(error);
      dispatch( onLogout('Invalid credentials.') )
      setTimeout(() => {
        dispatch( clearErrorMessage() )
      }, 10);
    }
  };

  return {
    //* Properties
    status,
    user,
    errorMessage,

    //* Methods
    startLogin
  }
}
