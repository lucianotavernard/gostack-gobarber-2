import React, { useState, useEffect } from 'react';
import { Alert, ActivityIndicator, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';

import api from '~/services/api';

import Background from '~/components/Background';
import DateInput from '~/components/DateInput';

import { Container, HourList, Hour, Title } from './styles';

export default function SelectDateTime({ navigation }) {
  const [date, setDate] = useState(new Date());
  const [hours, setHours] = useState([]);
  const [loading, setLoading] = useState(true);

  const provider = navigation.getParam('provider');

  useEffect(() => {
    async function loadAvailableHours() {
      try {
        const response = await api.get(`providers/${provider.id}/available`, {
          params: {
            date: date.getTime(),
          },
        });

        setHours(response.data);
      } catch (err) {
        const message =
          err.response && err.response.data
            ? err.response.data.error
            : 'Falha no carregamento das horas disponíveis.';

        Alert.alert('Ooopsss', message);
      } finally {
        setLoading(false);
      }
    }

    loadAvailableHours();
  }, [date, provider.id]);

  function handleSelectHour(time) {
    navigation.navigate('Confirm', {
      provider,
      time,
    });
  }

  function renderHour({ item: hour }) {
    return (
      <Hour
        onPress={() => handleSelectHour(hour.value)}
        enabled={hour.available}
      >
        <Title>{hour.time}</Title>
      </Hour>
    );
  }

  return (
    <Background>
      <Container>
        <DateInput value={date} onChange={setDate} />

        {loading ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <HourList
            data={hours}
            extraData={date}
            keyExtractor={item => item.time}
            renderItem={renderHour}
          />
        )}
      </Container>
    </Background>
  );
}

SelectDateTime.navigationOptions = ({ navigation }) => ({
  title: 'Selecione o horário',
  headerLeft: () => (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <MaterialIcons name="chevron-left" size={20} color="#fff" />
    </TouchableOpacity>
  ),
});

SelectDateTime.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    getParam: PropTypes.func.isRequired,
  }).isRequired,
};
