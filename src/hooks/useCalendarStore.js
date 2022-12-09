import { useDispatch, useSelector } from 'react-redux';
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
    // ToDo: llegar al backend 

    if( calendarEvent._id ){
      // Todo: Actualizar
      dispatch(onUpdateEvent({ ...calendarEvent }));
    }  
    else {
      const { data } = await calendarAPI.post('/events', calendarEvent);
      console.log(data);
      dispatch( onAddNewEvent({ ...calendarEvent, id: data.event.id, user }));
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
