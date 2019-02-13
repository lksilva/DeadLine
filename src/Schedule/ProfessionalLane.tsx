import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import styled from "styled-components";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import { palette } from "../themes/palette";
import { Avatar } from '@material-ui/core';

const Row = styled("div")<{
  hourHeight: number;
}>`
  height: ${props => props.hourHeight}px;
  border-bottom: 1px solid ${palette.primary.grayLight.A400};
`;

interface IProfessionalLane {
  name: string;
  photo: string;
  classes?: any;
  hoursArr: Array<string>;
  hourHeight: number;
}

const styles = () => ({
  card: {
    width: 170,
    minWidth: 170,
    borderRadius: 0,
    backgroundColor: 'transparent',
    boxShadow: 'none',
    overflow: 'initial',
  },
  cardHeader: {
    height: 66,
    padding: 0,
    paddingLeft: 10,
    backgroundColor: palette.primary.grayLight.A100,
    borderBottom: `1px solid ${palette.primary.grayLight.A400}`,
    borderTop: `1px solid ${palette.primary.grayLight.A400}`,
    position: 'sticky' as 'sticky',
    top: 0,
  },
  avatar: {
    width: 40,
    height: 40,
  },
  margin10: {
    marginRight: 10
  },
  cardContent: {
    padding: 0,
    borderRight: `1px solid ${palette.primary.grayLight.A400}`,
    "&:last-child": {
      paddingBottom: 0,
    }
  },
});

class ProfessionalLane extends Component<IProfessionalLane> {
  render(){

    const { classes, name, photo, hoursArr, hourHeight } = this.props;
    return(
      <Card classes={{ root: classes.card }}> 
        <CardHeader
          classes={{ root: classes.cardHeader, avatar: classes.margin10 }}
          avatar={
            <Avatar
              aria-label="Recipe"
              classes={{ root: classes.avatar }}
            >P</Avatar>
          }
          title={name}
        />
        <CardContent classes={{ root: classes.cardContent, }}>
          {hoursArr.map(item => <Row key={item} hourHeight={hourHeight} />)}
        </CardContent>
      </Card>
    )
  }
}

export default withStyles(styles)(ProfessionalLane);