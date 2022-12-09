import { useEffect, useState } from 'react';
import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { CalendarEvent, CalendarModal, FabAddNew, FabDelete, Navbar } from "../components";

import { getMessagesES, localizer } from '../../helpers';
import { useAuthStore, useCalendarStore, useUiStore } from '../../hooks';

export const CalendarPage = () => {
  const { user } = useAuthStore();
  const { openDateModal } = useUiStore();
  const { events, setActiveEvent, startLoadingEvents } = useCalendarStore();
  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week');
  
  const eventStyleGetter = ( event, start, end, isSelected ) => {
    const isMyEvent = ( user.uid === event.user._id ) || ( user.uid === event.user.uid );  
    const style = {
      backgroundColor: isMyEvent ? '#447CF7' : '#465660',
      opacity: 0.8,
      color: 'white'
    };

    return {
      style
    }
  };

  const onDoubleClick = (event) => {
    openDateModal();
  };

  const onSelect = (event) => {
    setActiveEvent( event );
  };

  const onViewChanged = (event) => {
    localStorage.setItem('lastView', event);
  };

  useEffect(() => {
    startLoadingEvents();
  }, [])

  return (
    <>
      <Navbar />

      <Calendar
        culture="es"
        defaultView={lastView}
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        messages={getMessagesES()}
        eventPropGetter={ eventStyleGetter }
        components={{event: CalendarEvent}}
        onDoubleClickEvent={ onDoubleClick }
        onSelectEvent={ onSelect }
        onView={onViewChanged}
      />

      <CalendarModal />
      <FabAddNew />
      <FabDelete />
    </>
  )
}
