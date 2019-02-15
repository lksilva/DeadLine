import React, { Component, createRef } from "react";
import { withStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import { Rnd } from "react-rnd";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import { palette } from "../themes/palette";
import { Avatar } from "@material-ui/core";

interface IBooking {
  color: string;
}

interface IState {
  bookings: Array<IBooking>;
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
    overflow: "initial",
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

  createBooking = () => {
    console.log("Criar o booking");
    const newBook = { color: palette.secondary.blueFacebook.A500 };
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

  private refBooking = createRef<HTMLDivElement>();

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
              onClick={this.createBooking}
              key={item}
              hourHeight={hourHeight}
            />
          ))}
          {!!this.state.bookings.length &&
            this.state.bookings.map(
              (item, index) => (
                <Rnd
                  key={index}
                  style={{
                    backgroundColor: item.color,
                    position: "absolute",
                    borderRadius: 2
                  }}
                  default={{
                    x: 0,
                    y: 0,
                    width: 152,
                    height: hourHeight
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
                />
              )
            )}
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(ProfessionalLane);
