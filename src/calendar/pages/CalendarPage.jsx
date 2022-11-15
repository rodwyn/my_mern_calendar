import { useState } from 'react';
import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { CalendarEvent, CalendarModal, Navbar } from "../components";

import { getMessagesES, localizer } from '../../helpers';
import { useCalendarStore, useUiStore } from '../../hooks';

import { addHours } from 'date-fns'

export const CalendarPage = () => {
  const { openDateModal } = useUiStore();
  const { events } = useCalendarStore();
  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week');
  
  const eventStyleGetter = ( event, start, end, isSelected ) => {
    const style = {
      backgroundColor: '#447CF7',
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
    console.log({ click: event });
  };

  const onViewChanged = (event) => {
    localStorage.setItem('lastView', event);
  };

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
    </>
  )
}
