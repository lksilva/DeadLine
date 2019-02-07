import React, { Component } from "react";
import styled, { keyframes } from "styled-components";

// handleChange = () => {
//   console.log('document.visibilityState ==>>', document.visibilityState);
//   if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support
//     console.log('hidden e visibilitychange');
//   } else if (typeof document.msHidden !== "undefined") {
//   console.log('msHidden e msvisibilitychange');
//   } else if (typeof document.webkitHidden !== "undefined") {
//   console.log('webkitHidden e webkitvisibilitychange')
//   }
// }
  
//   document.addEventListener("visibilitychange", handleChange, false);

const Container = styled("div")<{ height: number }>`
  width: 100%;
  height: ${props => props.height}px;
  display: flex;
`;

const WrapperMetric = styled.div`
  padding: 0px 11px;
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
  top: 4px;
  position: absolute;
`;

const gravitation = (initialY: number, finalY: number) => keyframes`
  from {
    transform: translateY(${initialY}px);
  }

  to {
    transform: translateY(${finalY}px);
  }
  `;

/**
 *
 * O tempo total está em minutos, então multiplicamos por 60 porque no cenário real ele deve se movimentar em segundos
 */
const Trace = styled("div")<{
  initialPosition: number;
  totalTime: number;
  finalPosition: number;
}>`
  height: 8px;
  width: 100%;
  position: absolute;
  top: ${props => props.finalPosition}px
`;

// animation: ${props => gravitation(props.initialPosition, props.finalPosition)} 0.1s linear;

// Graviton feito através apenas do css

// const Trace = styled("div")<{
//   ride: number;
//   totalTime: number;
//   currentTime: number;
// }>`
//   flex-direction: row;
//   height: 8px;
//   display: flex;
//   align-items: center;
//   width: 100%;
//   animation: ${props => gravitation(props.ride, props.currentTime)}
//     ${props => props.totalTime * 15}s linear;
// `;

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
      {props.hoursArr.map(item => (
        <Hour key={item} hourHeight={props.hourHeight}>
          {item}
        </Hour>
      ))}
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
    hoursArr: [],
    initialPosition: 0,
    finalPosition: 0,
    dropSpeed: 0,
    intervalId: 0,
  };

  componentDidMount() {
    const { finalJourney, initialJourney, pixelPerHour } = this.state;
    let arr: Array<string> = [];

    const hoursOpenByDay = (finalJourney - initialJourney) / 60;
    const totalPixelsLane = pixelPerHour * hoursOpenByDay;
    const dropSpeed = pixelPerHour / 60; // pixels/min
    const totalTime = totalPixelsLane / dropSpeed;

    /**
     * Estou pegando a hora atual em minutos para definir o start inicial do traço que delimita o horário atual na agenda
     */
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();
    const initialPosition = (currentTime - this.state.initialJourney) * dropSpeed;
    const finalPosition = initialPosition + dropSpeed;

    /**
     * Simulando a criação de um array com os horários do salão, talvez essa informação venha do backend e não precise manipular
     */
    for (let i = initialJourney; i < finalJourney; i += 60) {
      arr = arr.concat(`${i / 60}:00`);
    }

    this.setState({
      totalPixelsLane,
      totalTime,
      initialPosition,
      finalPosition,
      hoursOpenByDay,
      hoursArr: arr,
      dropSpeed,
    }, () => this.triggerTick());
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  /**
   * Método responsável por descer 1.5 pixels a cada minuto
   */
  triggerTick = () => {
    const minutes = 1; // o intervalo de tempo em minutos com que cada tick será disparado

    const minuteInMs = 60000;

    const intervalId = setInterval(() => this.tick(minutes), minuteInMs * minutes);
    this.setState({ intervalId });
  }

  tick = (minutes: number) => {
    const { finalPosition, dropSpeed } = this.state;
    const currentPos = finalPosition;
    const finalPos = finalPosition + (dropSpeed * minutes);

    console.log('tick');
    console.log('currentPos ==>>', currentPos);
    console.log('finalPos ==>>', finalPos);
    this.setState({ initialPosition: currentPos, finalPosition: finalPos });
  }

  render() {
    const {
      totalPixelsLane,
      totalTime,
      initialPosition,
      finalPosition,
      pixelPerHour,
      hoursArr
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
        {/* <Trace
          ride={totalPixelsLane}
          totalTime={totalTime}
          currentTime={currentTime}
        > */}
        <Trace totalTime={totalTime} initialPosition={initialPosition} finalPosition={finalPosition}>
          <Orb />
          <Line />
        </Trace>
      </Container>
    );
  }
}
