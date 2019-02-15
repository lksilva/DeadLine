import React, { Component, createRef } from "react";
import Icon from '@material-ui/core/Icon';
import styled from "styled-components";
import MetricHours from './Schedule/MetricHours';
import Trace from './Schedule/Trace';
import ProfessionalLane from './Schedule/ProfessionalLane';
import { palette } from "./themes/palette";

const Container = styled.div`
  width: 100%;
  display: flex;
  background-color: #ffa5000d;
`;

const WrapperMetric = styled("div")<{
  headerDiscount: number;
}>`
  padding: ${props => props.headerDiscount}px 11px 0 11px;
  position: relative;
  background: transparent;
`;

const WrapperBoard = styled.div`
  background-color: #15ff151f;
  top: -8px;
  position: relative;
`;

const ListProfLanes = styled.div`
  width: 100%;
  border-left: 1px solid ${palette.primary.grayLight.A400};
  display: flex;
`

const Button = styled.div`
  height: 66px;
  background-color: ${palette.primary.grayLight.A100};
  position: sticky;
  right: 0px;
  top: 0px;
  color: ${palette.secondary.grayLight.A900};
  border: 1px solid ${palette.primary.grayLight.A400};
  justify-content: center;
  align-items: center;
  display: flex;
  z-index: 2;
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

  handleProfSlider = () => {
    // Usando o ! para passar pelo TypeScript's Non-null 
    const node = this.refScheduleBoard.current!;
    const nodeScheduleContent = this.refScheduleLanes.current!;
    const laneWidth = 170;

    const scheduleContentSize = nodeScheduleContent.offsetWidth;
    const limitXScrool = node.scrollWidth;
    // Faço esse pequeno calculo para garantir que sempre o primeiro profissional ao realizar um scroll
    // vai ser exibido
    const variantFactor = (Math.round(scheduleContentSize / laneWidth)) * laneWidth;

    if (node.scrollLeft + variantFactor <= limitXScrool) {
      node.scrollLeft += variantFactor;
    }
  }

  private refScheduleBoard = createRef<HTMLDivElement>()

  private refScheduleLanes = createRef<HTMLDivElement>()

  render() {
    const {
      totalPixelsLane,
      finalPosition,
      pixelPerHour,
      hoursArr
    } = this.state;

    // É o tamanho do header de cada lane
    const headerDiscount = 66;

    return (
      <div style={{ width: 700, height: 500, overflow: 'auto' }} ref={this.refScheduleBoard}>
        <Container ref={this.refScheduleLanes}>
          <WrapperMetric headerDiscount={headerDiscount}>
            <MetricHours
              hourHeight={pixelPerHour}
              totalHeight={totalPixelsLane}
              hoursArr={hoursArr}
            />
          </WrapperMetric>
          <WrapperBoard>
            <Trace headerDiscount={headerDiscount} finalPosition={finalPosition} />
            <ListProfLanes>
              <ProfessionalLane hourHeight={pixelPerHour} hoursArr={hoursArr} name="René Descartes" photo="https://avecbrasil.com.br/wp-content/uploads/2018/09/logo-roxo.png" />
              <ProfessionalLane hourHeight={pixelPerHour} hoursArr={hoursArr} name="Gottfried Wilhelm Leibniz" photo="https://avecbrasil.com.br/wp-content/uploads/2018/09/logo-roxo.png" />
              <ProfessionalLane hourHeight={pixelPerHour} hoursArr={hoursArr} name="Leonhard Paul Euler" photo="https://avecbrasil.com.br/wp-content/uploads/2018/09/logo-roxo.png" />
              <ProfessionalLane hourHeight={pixelPerHour} hoursArr={hoursArr} name="Évariste Galois" photo="https://avecbrasil.com.br/wp-content/uploads/2018/09/logo-roxo.png" />
              <ProfessionalLane hourHeight={pixelPerHour} hoursArr={hoursArr} name="Pierre de Fermat" photo="https://avecbrasil.com.br/wp-content/uploads/2018/09/logo-roxo.png" />
              <ProfessionalLane hourHeight={pixelPerHour} hoursArr={hoursArr} name="René Descartes" photo="https://avecbrasil.com.br/wp-content/uploads/2018/09/logo-roxo.png" />
              <ProfessionalLane hourHeight={pixelPerHour} hoursArr={hoursArr} name="Gottfried Wilhelm Leibniz" photo="https://avecbrasil.com.br/wp-content/uploads/2018/09/logo-roxo.png" />
              <ProfessionalLane hourHeight={pixelPerHour} hoursArr={hoursArr} name="Leonhard Paul Euler" photo="https://avecbrasil.com.br/wp-content/uploads/2018/09/logo-roxo.png" />
              <ProfessionalLane hourHeight={pixelPerHour} hoursArr={hoursArr} name="Évariste Galois" photo="https://avecbrasil.com.br/wp-content/uploads/2018/09/logo-roxo.png" />
              <ProfessionalLane hourHeight={pixelPerHour} hoursArr={hoursArr} name="Pierre de Fermat" photo="https://avecbrasil.com.br/wp-content/uploads/2018/09/logo-roxo.png" />
              <ProfessionalLane hourHeight={pixelPerHour} hoursArr={hoursArr} name="René Descartes" photo="https://avecbrasil.com.br/wp-content/uploads/2018/09/logo-roxo.png" />
              <ProfessionalLane hourHeight={pixelPerHour} hoursArr={hoursArr} name="Gottfried Wilhelm Leibniz" photo="https://avecbrasil.com.br/wp-content/uploads/2018/09/logo-roxo.png" />
              <ProfessionalLane hourHeight={pixelPerHour} hoursArr={hoursArr} name="Leonhard Paul Euler" photo="https://avecbrasil.com.br/wp-content/uploads/2018/09/logo-roxo.png" />
              <ProfessionalLane hourHeight={pixelPerHour} hoursArr={hoursArr} name="Évariste Galois" photo="https://avecbrasil.com.br/wp-content/uploads/2018/09/logo-roxo.png" />
              <ProfessionalLane hourHeight={pixelPerHour} hoursArr={hoursArr} name="Leonhard Paul Euler" photo="https://avecbrasil.com.br/wp-content/uploads/2018/09/logo-roxo.png" />
              <ProfessionalLane hourHeight={pixelPerHour} hoursArr={hoursArr} name="Évariste Galois" photo="https://avecbrasil.com.br/wp-content/uploads/2018/09/logo-roxo.png" />
              <ProfessionalLane hourHeight={pixelPerHour} hoursArr={hoursArr} name="Pierre de Fermat" photo="https://avecbrasil.com.br/wp-content/uploads/2018/09/logo-roxo.png" />
              <ProfessionalLane hourHeight={pixelPerHour} hoursArr={hoursArr} name="René Descartes" photo="https://avecbrasil.com.br/wp-content/uploads/2018/09/logo-roxo.png" />
              <ProfessionalLane hourHeight={pixelPerHour} hoursArr={hoursArr} name="Gottfried Wilhelm Leibniz" photo="https://avecbrasil.com.br/wp-content/uploads/2018/09/logo-roxo.png" />
              <ProfessionalLane hourHeight={pixelPerHour} hoursArr={hoursArr} name="Leonhard Paul Euler" photo="https://avecbrasil.com.br/wp-content/uploads/2018/09/logo-roxo.png" />
              <ProfessionalLane hourHeight={pixelPerHour} hoursArr={hoursArr} name="Évariste Galois" photo="https://avecbrasil.com.br/wp-content/uploads/2018/09/logo-roxo.png" />
            </ListProfLanes>
          </WrapperBoard>
          <Button onClick={this.handleProfSlider}>
            <Icon fontSize="large">keyboard_arrow_right</Icon>
          </Button>
        </Container>
      </div>
    );
  }
}
