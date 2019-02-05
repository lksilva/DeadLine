import React, { Component } from "react";
import styled from 'styled-components';

const initialJourney: number = 480;
const finalJourney: number = 1320;
const hoursOpenByDay: number = (finalJourney - initialJourney) / 60;
const pixelPerHour: number = 90;
const totalPixelsLane: number = pixelPerHour * hoursOpenByDay;

const Container = styled("div")<{ height: number }>`
width: 100%;
height: ${props => props.height}px;
background-color: palevioletred;
`;

const Orb = styled.div`
width: 8px;
height: 8px;
background-color: #BC2C3E;
border-radius: 4px;
`;

const Line = styled.div`
width: 100%;
height: 1px;
background-color: #BC2C3E 
`;

const Trace = styled.div`
flex-direction: row;
height: 8px;
display: flex;
align-items: center;
`

export default class App extends Component {
  render() {
    console.log('pixelPerHour', totalPixelsLane)
    return(
      <Container height={totalPixelsLane}>
        <Trace>
          <Orb />
          <Line />
        </Trace>
      </Container>
    )
  }
};
