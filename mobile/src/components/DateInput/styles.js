import styled, { css } from 'styled-components/native';
import { Platform } from 'react-native';

export const Container = styled.View`
  margin: 60px 0 30px;
`;

export const DateButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  height: 46px;
  margin: 0 30px;
  padding: 0 15px;
  border-radius: 4px;
  background: rgba(0, 0, 0, 0.1);
`;

export const DateText = styled.Text`
  margin-left: 15px;
  color: #fff;
  font-size: 14px;
`;

export const Picker = styled.View`
  ${Platform.OS === 'ios' &&
    css`
      margin-top: 30px;
      padding: 15px 30px;
      background: #fff;
    `}
`;
