import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import calendarAPI from '../api/calendarApi';
import { convertEventsToDateEvents } from '../helpers';
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from '../store';

export const useCalendarStore = () => {
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector(state => state.calendar);
  const { user } = useSelector(state => state.auth);

  const setActiveEvent = ( calendarEvent ) => {
    dispatch( onSetActiveEvent(calendarEvent) );
  };

  const startSavingEvent = async( calendarEvent ) => {
    try {
      if( calendarEvent.id ){
        // update
        const {} = await calendarAPI.put(`/events/${ calendarEvent.id }`, calendarEvent);
        dispatch(onUpdateEvent({ ...calendarEvent }));
        return;
      }  
      
      // create
      const { data } = await calendarAPI.post('/events', calendarEvent);
      dispatch( onAddNewEvent({ ...calendarEvent, id: data.event.id, user })); 
    } catch (error) {
      console.log( error );
      Swal.fire('Saving Error', error.response.data?.msg, 'error')
    }
  };

  const startDeletingEvent = () => {
    dispatch( onDeleteEvent() );
  };

  const startLoadingEvents = async() => {
    try {
      const { data } = await calendarAPI.get('/events');
      const events = convertEventsToDateEvents( data.events );
      dispatch( onLoadEvents( events ) );
      console.log(events);
    } catch (error) {
      console.log(error);
    }
  };
  
  return  {
    //* Properties
    activeEvent,
    events,
    hasEventSelected: !!activeEvent,

    //* methods
    setActiveEvent,
    startDeletingEvent,
    startLoadingEvents,
    startSavingEvent,
  }
}
