import React, { Component, Fragment } from "react";
import styled, { keyframes } from "styled-components";
import { number } from "prop-types";

const Container = styled("div")<{ height: number }>`
  width: 100%;
  height: ${props => props.height}px;
  display: flex;
`;

const Orb = styled.div`
  width: 8px;
  height: 8px;
  background-color: #bc2c3e;
  border-radius: 4px;
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: #bc2c3e;
`;

const gravitation = (ride: number, currentTime: number) => keyframes`
  from {
    transform: translateY(${currentTime}px);
  }

  to {
    transform: translateY(${ride}px);
  }
  `;

/**
 *
 * O tempo total do está em minutos, então multiplicamos por 60 porque no cenário real ele deve se movimentar em segundos
 */
const Trace = styled("div")<{
  ride: number;
  totalTime: number;
  currentTime: number;
}>`
  flex-direction: row;
  height: 8px;
  display: flex;
  align-items: center;
  width: 100%;
  animation: ${props => gravitation(props.ride, props.currentTime)}
    ${props => props.totalTime * 60}s linear;
`;

/**
 * Component HoursLane
 */

interface IMetricHours {
  initial: number;
  end: number;
  hourHeight: number;
  totalHeight: number;
}

const HoursLane = styled("div")<{ height: number }>`
  flex-direction: coloumn;
  width: 36px;
  height: ${props => props.height}px;
`;

const Hour = styled("div")<{
  hourHeight: number;
}>`
  height: ${props => props.hourHeight}px;
  display: flex;
  justify-content: center;
  font-size: 14px;
  color: #7b7b88;
`;

export const MetricHours = (props: IMetricHours) => {
  return (
    <HoursLane height={props.totalHeight}>
      <Hour hourHeight={props.hourHeight}>8:00</Hour>
      <Hour hourHeight={props.hourHeight}>9:00</Hour>
      <Hour hourHeight={props.hourHeight}>10:00</Hour>
      <Hour hourHeight={props.hourHeight}>11:00</Hour>
      <Hour hourHeight={props.hourHeight}>12:00</Hour>
      <Hour hourHeight={props.hourHeight}>13:00</Hour>
      <Hour hourHeight={props.hourHeight}>14:00</Hour>
      <Hour hourHeight={props.hourHeight}>15:00</Hour>
      <Hour hourHeight={props.hourHeight}>16:00</Hour>
      <Hour hourHeight={props.hourHeight}>17:00</Hour>
      <Hour hourHeight={props.hourHeight}>18:00</Hour>
      <Hour hourHeight={props.hourHeight}>19:00</Hour>
      <Hour hourHeight={props.hourHeight}>20:00</Hour>
      <Hour hourHeight={props.hourHeight}>21:00</Hour>
    </HoursLane>
  );
};

export default class App extends Component {
  state = {
    initialJourney: 480,
    finalJourney: 1320,
    pixelPerHour: 90,
    hoursOpenByDay: 0,
    totalPixelsLane: 0,
    totalTime: 0, // in minutes
    currentTime: 0 // in minutes
  };

  componentDidMount() {
    const hoursOpenByDay =
      (this.state.finalJourney - this.state.initialJourney) / 60;
    const totalPixelsLane = this.state.pixelPerHour * hoursOpenByDay;
    const dropSpeed = this.state.pixelPerHour / 60; // pixels/min
    const totalTime = totalPixelsLane / dropSpeed;

    /**
     * Estou pegando a hora atual em minutos para definir o start inicial do traço que delimita o horário atual na agenda
     */
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();
    console.log('Current time ==>>', currentTime);
    this.setState({ totalPixelsLane, totalTime, currentTime, hoursOpenByDay });
  }

  render() {
    const {
      totalPixelsLane,
      totalTime,
      currentTime,
      pixelPerHour,
      finalJourney,
      initialJourney
    } = this.state;

    return (
      <Container height={totalPixelsLane}>
        <MetricHours
          initial={initialJourney}
          end={finalJourney}
          hourHeight={pixelPerHour}
          totalHeight={totalPixelsLane}
        />
        <Trace
          ride={totalPixelsLane}
          totalTime={totalTime}
          currentTime={currentTime}
        >
          <Orb />
          <Line />
        </Trace>
      </Container>
    );
  }
}
