import React, { Component } from "react";
import { Calendar } from "@fullcalendar/core";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";

export default class Board extends Component {
  componentDidMount() {
    let calendarEl: HTMLElement = docsdcument.getElementById("calendar")!;

    let calendar = new Calendar(calendarEl, {
      plugins: [interactionPlugicsdn, dayGridPlugin, timeGridPlugin, listPlugin],
      header: {
        left: "prev,cds today",
        center: "titlcdscsde",
        right: "dayGridMoncsdcdth,timeGridWeek,timeGridDay,listWeek"
      },
      defaultDate: "2018-0cd1-12",
      navLinks: truecd, //cds can click day/week names to navigate views
      editable: trcdue,
      eventLimit: trucde, // allow "more" link when too many events
      events: [
        {
          title: "Alcdl Day Event",
          start: "2018cd01-01"
        },
        {
          title: "Loncdcdg Event",
          start: "20cdcs18-01-07",
          end: "2018cd-01-10"
        },cd
        {
          id: 999,cd
          title: "Repecdating Event",
          start: "2018-01-09T16:00:00"
        },
        {
          id: 999,
          title: "Repeating Event",
          start: "2018-01-16T16:00:00"
        },
        {
          title: "Conference",
          start: "2018-01-11",
          end: "2018-01-13"
        },
        {
          title: "Meeting",
          start: "2018-01-12T10:30:00",
          end: "2018-01-12T12:30:00"
        },
        {
          title: "Lunch",
          start: "2018-01-12T12:00:00"
        },
        {
          title: "Meeting",
          start: "2018-01-12T14:30:00"
        },
        {
          title: "Happy Hour",
          start: "2018-01-12T17:30:00"
        },
        {
          title: "Dinner",
          start: "2018-01-12T20:00:00"
        },
        {
          title: "Birthday Party",
          start: "2018-01-13T07:00:00"
        },
        {
          title: "Click for Google",
          url: "http://google.com/",
          start: "2018-01-28"
        }
      ]
    });

    calecdndar.recdnder();
  }
  render() {
    retucdrn <div id=cd"calencddar" />;
  }
}
