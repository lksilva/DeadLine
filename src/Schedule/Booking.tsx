import React from "react";
import { Rnd } from "react-rnd";
import Typography from '@material-ui/core/Typography';
import styled from "styled-components";

import theme from '../themes/card';

const Text = styled("div")<{
  color: string;
}>`
  color: ${props => props.color};
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 0.75rem;
  font-weight: 400;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  line-height: 1.35em;
`;

const Title = styled("div")<{
  color: string
}>`
  color: ${props => props.color}
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 0.75rem;
  font-family: "Roboto-Bold", "Helvetica", "Arial", sans-serif;
  font-weight: 600;
  line-height: 1.35em;
`

interface IBooking {
  status: "scheduled" | "confirmed" | "waiting" | "inProgress" | "finished" | "paid" | "preferential" | "programed" | "noShow";
  height: number;
  client: string;
  service: string;
}

const Booking: React.SFC<IBooking> = ({ height, status, client, service }) => {
  return (
    <Rnd
      style={{
        backgroundColor: theme[status].main,
        color: 'white',
        position: "absolute",
        borderRadius: 2,
        padding: 5,
      }}
      default={{
        x: 0,
        y: 0,
        width: 152,
        height: height
      }}
      resizeGrid={[1, 15]}
      enableResizing={{
        top: false,
        right: false,
        bottom: true,
        left: false,
        topRight: false,
        bottomRight: false,
        bottomLeft: false,
        topLeft: false
      }}
      bounds="parent"
    >
      <Text color={theme[status].contrastText}>
        12:00 - 14:00
      </Text>
      <Title color={theme[status].contrastText}>
        {client}
      </Title>
      <Text color={theme[status].contrastText}>
        {service}
      </Text>
    </Rnd>
  );
};

export default Booking;
