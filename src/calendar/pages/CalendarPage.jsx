import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { addHours } from 'date-fns'
import { Navbar } from "../components/Navbar"
import { getMessagesES, localizer } from '../../helpers';

const events = [{
  title: 'Boss Birthday',
  notes: 'Buy a cake',
  start: new Date(),
  end: addHours(new Date(), 2)
}];

export const CalendarPage = () => {
  const eventStyleGetter = ( event, start, end, isSelected ) => {
    console.log({event, start, end, isSelected});

    const style = {
      backgroundColor: '#447CF7',
      opacity: 0.8,
      color: 'white'
    };

    return {
      style
    }
  };


  return (
    <>
      <Navbar />

      <Calendar
        culture="es"
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        messages={getMessagesES()}
        eventPropGetter={ eventStyleGetter }
      />
    </>
  )
}
