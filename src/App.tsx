import React, { Component, Fragment } from "react";
import styled, { keyframes } from "styled-components";

const Container = styled("div")<{ height: number }>`
  width: 100%;
  height: ${props => props.height}px;
  display: flex;
`;

const WrapperMetric = styled.div`
  padding: 0px 11px;
`

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
    ${props => props.totalTime * 30}s linear;
`;

/**
 * Component HoursLane
 */

interface IMetricHours {
  hoursArr: Array<string>;
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
      {props.hoursArr.map(item => <Hour key={item} hourHeight={props.hourHeight}>{item}</Hour>)}
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
    currentTime: 0, // in minutes
    hoursArr: [],
  };

  componentDidMount() {
    const { finalJourney, initialJourney, pixelPerHour } = this.state;
    let arr: Array<string> = [];

    const hoursOpenByDay =
      (finalJourney - initialJourney) / 60;
    const totalPixelsLane = pixelPerHour * hoursOpenByDay;
    const dropSpeed = pixelPerHour / 60; // pixels/min
    const totalTime = totalPixelsLane / dropSpeed;

    /**
     * Estou pegando a hora atual em minutos para definir o start inicial do traço que delimita o horário atual na agenda
     */
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();
    const matchingTime = (currentTime - this.state.initialJourney) * dropSpeed;

    /**
     * Simulando a criação de um array com os horários do salão, talvez essa informação venha do backend e não precise manipular
     */
    for (let i = initialJourney; i < finalJourney; i += 60) {
      arr = arr.concat(`${(i / 60)}:00`);
    };

    this.setState({ totalPixelsLane, totalTime, currentTime: matchingTime, hoursOpenByDay, hoursArr: arr });
  }

  render() {
    const {
      totalPixelsLane,
      totalTime,
      currentTime,
      pixelPerHour,
      hoursArr,
    } = this.state;

    return (
      <Container height={totalPixelsLane}>
        <WrapperMetric>
          <MetricHours
            hourHeight={pixelPerHour}
            totalHeight={totalPixelsLane}
            hoursArr={hoursArr}
          />
        </WrapperMetric>
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
