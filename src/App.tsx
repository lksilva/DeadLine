import React, { Component } from "react";
import styled from "styled-components";
import MetricHours from './Schedule/MetricHours';
import Trace from './Schedule/Trace';

const Container = styled("div")<{ height: number }>`
  width: 100%;
  height: ${props => props.height}px;
  display: flex;
`;

const WrapperMetric = styled.div`
  padding: 0px 11px;
`;

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
    document.addEventListener('visibilitychange', this.handleVisibility, false);
    window.addEventListener('focus', this.handleForceVisibility, false);
    this.setTracePosition();
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
    document.removeEventListener('visibilitychange', this.handleVisibility);
    window.removeEventListener('focus', this.handleForceVisibility);
  }

  setTracePosition = () => {
    clearInterval(this.state.intervalId);

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

  /**
   * Metodo responsável por manipular quanto o usuário voltou a deixar a aba do navegador ativa
   * Para mais informações de como funciona a API que manipula o status das abas nos navegadores
   * https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API
   * 
   */

  handleVisibility = () => {
    if (!document.hidden) {
      this.setTracePosition();
    }
  }
  /**
   * Existe alguns casos em que o PageVisibilityAPI não detecta que o browser está ativo novamente,
   * então eu criei essa função pra forçar a reposição do traço que delimita o horário quando cair nesses casos
   * https://able.bio/drenther/track-page-visibility-in-react-using-render-props--78o9yw5
   */
  handleForceVisibility = () => {
    if (document.hidden) {
      this.setTracePosition();
    }
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

    this.setState({ initialPosition: currentPos, finalPosition: finalPos });
  }

  render() {
    const {
      totalPixelsLane,
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
        <Trace finalPosition={finalPosition} />
      </Container>
    );
  }
}
