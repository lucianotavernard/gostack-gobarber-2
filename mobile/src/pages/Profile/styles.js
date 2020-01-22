import styled from 'styled-components/native';

import Input from '~/components/Input';
import Button from '~/components/Button';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const Title = styled.Text`
  align-self: center;
  margin-top: 30px;
  color: #fff;
  font-size: 20px;
  font-weight: bold;
`;

export const Separator = styled.View`
  height: 1px;
  margin: 20px 0 30px;
  background: rgba(255, 255, 255, 0.2);
`;

export const Form = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    padding: 20,
  },
})`
  align-self: stretch;
`;

export const FormInput = styled(Input)`
  margin-bottom: 10px;
`;

export const SubmitButton = styled(Button)`
  margin-top: 20px;
`;

export const SignOutButton = styled(Button)`
  margin-top: 20px;
  background: #f64c75;
`;
