import React from 'react';
import styled from 'styled-components';

interface ITrace {
  finalPosition: number;
  headerDiscount: number;
}

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

const Container = styled("div")<{
  finalPosition: number;
  headerDiscount: number;
}>`
  flex-direction: row;
  height: 8px;
  display: flex;
  align-items: center;
  width: 100%;
  transform: translateY(${props => ( props.finalPosition + props.headerDiscount )}px);
`;

const Trace = (props: ITrace) => {
  return (
    <Container headerDiscount={(props.headerDiscount - 4)} finalPosition={props.finalPosition}>
      <Orb />
      <Line />
    </Container>
  );
};

export default Trace;
