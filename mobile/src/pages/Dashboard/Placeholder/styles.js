import styled from 'styled-components/native';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import { LinearGradient } from 'expo-linear-gradient';

const Placeholder = styled(ShimmerPlaceHolder).attrs({
  colorShimmer: ['#ccc', '#eee', '#ccc'],
  duration: 1000,
})``;

export const AppointmentsContainer = styled.View`
  margin-bottom: 15px;
`;

export const AppointmentCards = styled.ScrollView`
  padding: 20px;
`;

export const AppointmentCard = styled(LinearGradient).attrs({
  colors: ['#fff', '#eee'],
  start: { x: 0, y: 0.75 },
  end: { x: 1, y: 0.25 },
  locations: [0, 1],
})`
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
  padding: 20px;
  border-radius: 4px;
`;

export const AppointmentPicturePlaceholder = styled(Placeholder)`
  width: 50px;
  height: 50px;
  border-radius: 25px;
`;

export const AppointmentInfoContainer = styled.View`
  margin-left: 20px;
`;

export const AppointmentInfoNamePlaceholder = styled(Placeholder)``;

export const AppointmentInfoTimePlaceholder = styled(Placeholder)`
  width: 100px;
  height: 12px;
  margin-top: 5px;
`;
