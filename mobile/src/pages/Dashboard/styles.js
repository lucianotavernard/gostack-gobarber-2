import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const Title = styled.Text`
  align-self: center;
  margin: 30px 0 20px;
  color: #fff;
  font-size: 20px;
  font-weight: bold;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingHorizontal: 20,
  },
})``;

export const Empty = styled.Text`
  margin-top: 50%;
  color: #fff;
  font-size: 15px;
  text-align: center;
`;

export const Footer = styled.View`
  height: 40px;
`;
