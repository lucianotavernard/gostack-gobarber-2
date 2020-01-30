import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.SafeAreaView`
  flex: 1;
  padding: 30px 0;
`;

export const ProviderList = styled.FlatList.attrs({
  numColumns: 2,
  contentContainerStyle: {
    padding: 10,
  },
  showsVerticalScrollIndicator: false,
})`
  margin-top: 60px;
`;

export const Provider = styled(RectButton)`
  flex: 1;
  align-items: center;
  margin: 0 10px 20px;
  padding: 20px;
  border-radius: 4px;
  background: #fff;
`;

export const Avatar = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
`;

export const Name = styled.Text`
  margin-top: 15px;
  color: #333;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
`;
