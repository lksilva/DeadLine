import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import styled from "styled-components";
import { palette } from "../themes/palette";
import { Avatar } from '@material-ui/core';

interface IProfessionalLane {
  name: string;
  photo: string;
  classes?: any;
}

const styles = () => ({
  card: {
    maxWidth: 170,
    borderRadius: 0,
  },
  cardHeader: {
    backgroundColor: 'blue',
    height: 66,
    padding: 0,
    paddingLeft: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    backgroundColor: 'red',
  },
  cardContent: {
    paddingRight: 14,
  }
});

class ProfessionalLane extends Component<IProfessionalLane> {
  render(){

    const { classes, name, photo } = this.props;
    return(
      <Card className={classes.card}>
        <CardHeader
          className={classes.cardHeader}
          avatar={
            <Avatar
              aria-label="Recipe"
              className={classes.avatar}
            >P</Avatar>
          }
          title={name}
        />
        <CardContent>
          Conteudo do profissional
        </CardContent>
      </Card>
    )
  }
}

export default withStyles(styles)(ProfessionalLane);