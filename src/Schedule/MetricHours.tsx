import React from 'react';
import styled from "styled-components";

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

const MetricHours = (props: IMetricHours) => {
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

export default MetricHours;
