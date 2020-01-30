import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import { MaterialIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';

import api from '~/services/api';

import Background from '~/components/Background';
import Appointment from '~/components/Appointment';
import Placeholder from './Placeholder';

import { Container, Title, List, Empty, Footer } from './styles';

function Dashboard({ isFocused }) {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  async function loadAppointments() {
    try {
      const response = await api.get('appointments');

      setAppointments(response.data);
    } catch (error) {
      Alert.alert(
        'Erro ao obter lista de agendamentos, tente novamente mais tarde!'
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (isFocused) loadAppointments();
  }, [isFocused]);

  async function refreshList() {
    setRefreshing(true);

    await loadAppointments();

    setRefreshing(false);
  }

  async function handleCancelAppointment(id) {
    try {
      const response = await api.delete(`appointments/${id}`);

      setAppointments(
        appointments.map(appointment =>
          appointment.id === id
            ? { ...appointment, canceled_at: response.data.canceled_at }
            : appointment
        )
      );
    } catch (err) {
      const message =
        err.response && err.response.data
          ? err.response.data.error
          : 'Falha no cancelamento do agendamento';

      Alert.alert('Ooopsss', message);
    }
  }

  function renderAppointment({ item: appointment }) {
    return (
      <Appointment
        data={appointment}
        onCancel={() => handleCancelAppointment(appointment.id)}
      />
    );
  }

  return (
    <Background>
      <Container>
        <Title>Agendamentos</Title>

        {loading ? (
          <Placeholder />
        ) : (
          <List
            data={appointments}
            keyExtractor={item => String(item.id)}
            renderItem={renderAppointment}
            onRefresh={refreshList}
            refreshing={refreshing}
            ListFooterComponent={<Footer />}
            ListEmptyComponent={<Empty>Você não possui agendamentos.</Empty>}
          />
        )}
      </Container>
    </Background>
  );
}

function TabBarIcon({ tintColor }) {
  return <MaterialIcons name="event" size={20} color={tintColor} />;
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Agendamentos',
  tabBarIcon: <TabBarIcon />,
};

TabBarIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

Dashboard.propTypes = {
  isFocused: PropTypes.bool.isRequired,
};

export default withNavigationFocus(Dashboard);
