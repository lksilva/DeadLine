import React, { Component } from "react";
import styled from "styled-components";

const Container = styled("div")<{ height: number }>`
  width: 100%;
  height: ${props => props.height}px;
  display: flex;
`;

const WrapperMetric = styled.div`
  padding: 0px 11px;
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

/**
 *
 * O tempo total está em minutos, então multiplicamos por 60 porque no cenário real ele deve se movimentar em segundos
 */
// const Trace = styled("div")<{
//   initialPosition: number;
//   totalTime: number;
//   finalPosition: number;
// }>`
//   height: 8px;
//   width: 100%;
//   position: absolute;
//   top: ${props => props.finalPosition}px
// `;

// animation: ${props => gravitation(props.initialPosition, props.finalPosition)} 0.1s linear;

// Graviton feito através apenas do css

const Trace = styled("div")<{
  finalPosition: number;
}>`
  flex-direction: row;
  height: 8px;
  display: flex;
  align-items: center;
  width: 100%;
  transform: translateY(${props => props.finalPosition}px);
`;

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

export const MetricHours = (props: IMetricHours) => {
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
      console.log('#handleVisibility Vai disparar o evento de setTracePosition');
      this.setTracePosition();
    }
  }
  /**
   * Existe alguns casos em que o PageVisibilityAPI não detecta que o browser está ativo novamente,
   * então eu criei essa função pra forçar a reposição do traço que delimita o horário quando cair nesses casos
   * https://able.bio/drenther/track-page-visibility-in-react-using-render-props--78o9yw5
   */
  handleForceVisibility = () => {
    console.log('#handleForceVisibility document.hidden ==>>', document.hidden);
    if (document.hidden) {
      console.log('vai forcar o TracePosition');
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
        <Trace finalPosition={finalPosition}>
          <Orb />
          <Line />
        </Trace>
      </Container>
    );
  }
}
