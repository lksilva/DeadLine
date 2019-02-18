import React, { Component, createRef } from "react";
import { withStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import { palette } from "../themes/palette";
import { Avatar } from "@material-ui/core";
import Booking from "./Booking";

interface IState {
  bookings: Array<any>;
  isResizing: boolean;
  isPressed: boolean;
}

interface IProfessionalLane {
  name: string;
  photo: string;
  classes?: any;
  hoursArr: Array<string>;
  hourHeight: number;
}

const Row = styled("div")<{
  hourHeight: number;
}>`
  height: ${props => props.hourHeight}px;
  border-bottom: 1px solid ${palette.primary.grayLight.A400};
`;

const styles = () => ({
  card: {
    width: 170,
    minWidth: 170,
    borderRadius: 0,
    backgroundColor: "transparent",
    boxShadow: "none",
    overflow: "initial"
  },
  cardHeader: {
    height: 66,
    padding: 0,
    paddingLeft: 10,
    backgroundColor: palette.primary.grayLight.A100,
    borderBottom: `1px solid ${palette.primary.grayLight.A400}`,
    borderTop: `1px solid ${palette.primary.grayLight.A400}`,
    borderRight: `1px solid ${palette.primary.grayLight.A400}`,
    position: "sticky" as "sticky",
    top: 0,
    zIndex: 2
  },
  avatar: {
    width: 40,
    height: 40
  },
  margin10: {
    marginRight: 10
  },
  cardContent: {
    padding: 0,
    borderRight: `1px solid ${palette.primary.grayLight.A400}`,
    cursor: "pointer",
    "&:last-child": {
      paddingBottom: 0
    }
  }
});

class ProfessionalLane extends Component<IProfessionalLane, IState> {
  state: IState = {
    bookings: [],
    isResizing: false,
    isPressed: false
  };

  /**
   * Método responsável por simular a criação dos bookings
   */
  createBooking = (event: any, hourHeight: number) => {
    const quandrant = this.getQuadrant(event.target.offsetTop, hourHeight);

    const positionY = quandrant * hourHeight;

    /**
     * Simulando a criação dos bookings variando em apenas dois status
     */
    const status = Math.floor(Math.random() * 2) ? "scheduled" : "inProgress";
    const client = Math.floor(Math.random() * 2)
      ? "Joseph Louis Lagrange"
      : "Pierre-Simon Laplace";
    const service = Math.floor(Math.random() * 2) ? "Derivada" : "Integral";

    const newBook = { status, client, service, positionY };
    this.setState({ bookings: [...this.state.bookings, newBook] });
  };

  handleBooking = () => {
    console.log("Handlebooking");
  };

  startResize = () => {
    console.log("Iniciado o resize");
    this.setState({ isResizing: true });
  };

  stopResize = () => {
    console.log("Chamou o stopResize");
    const { isPressed } = this.state;
    if (!isPressed) return;
    console.log("Parou de fazer o resize");
    this.setState({ isResizing: false });
  };

  startPressed = () => {
    console.log("Começou a prescionar o elemento");
    this.setState({ isPressed: true, isResizing: true });
  };

  stopPressed = () => {
    console.log("Parou de prescionar o elemento");
    this.setState({ isPressed: false });
  };

  /**
   * Método responsável por capturar o quadrante"schedule" cujo usuário clicou
   */
  getQuadrant = (positionCliked: number, heightQuadrant: number) => {
    return Math.floor(positionCliked / heightQuadrant);
  }

  render() {
    const { classes, name, photo, hoursArr, hourHeight } = this.props;

    return (
      <Card classes={{ root: classes.card }}>
        <CardHeader
          classes={{ root: classes.cardHeader, avatar: classes.margin10 }}
          avatar={
            <Avatar aria-label="Recipe" classes={{ root: classes.avatar }}>
              P
            </Avatar>
          }
          title={name}
        />
        <CardContent classes={{ root: classes.cardContent }}>
          {hoursArr.map(item => (
            <Row
              onClick={(event) => this.createBooking(event, hourHeight)}
              key={item}
              hourHeight={hourHeight}
            />
          ))}
          {!!this.state.bookings.length &&
            this.state.bookings.map((item, index) => (
              <Booking
                key={index}
                status={item.status}
                client={item.client}
                service={item.service}
                positionY={item.positionY}
                height={hourHeight}
                handleBooking={this.handleBooking}
              />
            ))}
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(ProfessionalLane);
