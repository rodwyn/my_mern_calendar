import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { addHours } from 'date-fns'
import { Navbar } from "../components/Navbar"
import { getMessagesES, localizer } from '../../helpers';
import { CalendarEvent } from '../components/CalendarEvent';
import { useState } from 'react';

const events = [{
  title: 'Boss Birthday',
  notes: 'Buy a cake',
  start: new Date(),
  end: addHours(new Date(), 2)
}];

export const CalendarPage = () => {
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
    console.log({ doubleClick: event });
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
    </>
  )
}
