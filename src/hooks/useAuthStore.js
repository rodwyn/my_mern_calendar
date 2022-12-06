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

  const startRegistration = async( { email, password, name }) => {
    dispatch( onChecking() );

    try {
      const { data } = await calendarAPI.post('/auth/new', { email, password, name }); 
      localStorage.setItem('token', data.token);
      localStorage.setItem('token_init_date', new Date().getTime());
      dispatch( onLogin({ name: data.name, uid: data.uid }) );
    } catch (error) {
      const { response } = error;

      dispatch( onLogout(response.data.msg) )
      setTimeout(() => {
        dispatch( clearErrorMessage() )
      }, 10);
    }
  };

  const checkAuthToken = async() => {
    const token = localStorage.getItem('token');

    if ( !token ) return dispatch( onLogout() );

    try {
      const { data } = await calendarAPI.get('auth/renew');

      // localStorage.setItem('token', data.token);
      // localStorage.setItem('token_init_date', new Date().getTime());
      // dispatch( onLogin({ name: data.name, uid: data.uid }) );
      setTokenData(data);
    } catch (error) {
      console.log(error);
      localStorage.clear();
      dispatch( onLogout() );
    }
  };

  const startLogout = () => {
    localStorage.clear();
    dispatch( onLogout() );
  };

  const setTokenData = ( data ) => {
    localStorage.setItem('token', data.token);
    localStorage.setItem('token_init_date', new Date().getTime());
    dispatch( onLogin({ name: data.name, uid: data.uid }) );
  };

  return {
    //* Properties
    status,
    user,
    errorMessage,

    //* Methods
    checkAuthToken,
    startLogin,
    startLogout,
    startRegistration,
  }
}
