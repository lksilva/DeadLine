import React, { Component } from "react";
import styled, { keyframes } from "styled-components";

const Container = styled("div")<{ height: number }>`
  width: 100%;
  height: ${props => props.height}px;
  background-color: palevioletred;
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

const gravitation = (ride: number) => keyframes`
  from {
    transform: translateY(0px);
  }

  to {
    transform: translateY(${ride}px);
  }
  `
;

/**
 * 
 * O tempo total do está em minutos, então multiplicamos por 60 porque no cenário real ele deve se movimentar em segundos
*/
const Trace = styled("div")<{ ride: number; totalTime: number }>`
  flex-direction: row;
  height: 8px;
  display: flex;
  align-items: center;
  animation: ${props => gravitation(props.ride)} ${props => props.totalTime}s linear;
`;
// transition: transform ${props => props.totalTime}s linear;
// transform: translateY(${props => props.ride}px);
export default class App extends Component {
  state = {
    initialJourney: 480,
    finalJourney: 1320,
    pixelPerHour: 90,
    totalPixelsLane: 0,
    totalTime: 0,
  };

  componentDidMount() {
    const hoursOpenByDay = (this.state.finalJourney - this.state.initialJourney) / 60;
    const totalPixelsLane = this.state.pixelPerHour * hoursOpenByDay;
    const dropSpeed = this.state.pixelPerHour / 60; // pixels/min
    const totalTime = totalPixelsLane / dropSpeed;
    this.setState({ totalPixelsLane, totalTime });
  }

  render() {
    const { totalPixelsLane, totalTime } = this.state;
    console.log('this.state ==>>', this.state);
    return (
      <Container height={totalPixelsLane}>
        <Trace ride={totalPixelsLane} totalTime={totalTime}>
          <Orb />
          <Line />
        </Trace>
      </Container>
    );
  }
}
