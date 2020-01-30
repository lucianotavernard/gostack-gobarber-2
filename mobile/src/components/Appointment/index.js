import React, { useMemo } from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';

import { formatRelative, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { Container, Left, Avatar, Info, Name, Time, Canceled } from './styles';

export default function Appointment({ data, onCancel }) {
  const dateFormated = useMemo(
    () =>
      formatRelative(parseISO(data.date), new Date(), {
        locale: ptBR,
        addSuffix: true,
      }),
    [data.date]
  );

  function handleCancelAppointment() {
    Alert.alert(
      'Tem certeza que deseja fazer isso?',
      'Cancelar seu agendamento liberará uma vaga para esse horário e você pode acabar perdendo sua vaga.',
      [
        {
          text: 'Cancelar',
        },
        {
          text: 'Confirmar',
          onPress: onCancel,
        },
      ]
    );
  }

  return (
    <Container past={data.past}>
      <Left>
        <Avatar
          source={{
            uri: data.provider.avatar
              ? data.provider.avatar.url
              : `https://api.adorable.io/avatar/50/${data.provider.name}.png`,
          }}
        />

        <Info>
          <Name>{data.provider.name}</Name>
          <Time>{dateFormated}</Time>
          {data.canceled_at && <Canceled>Cancelled</Canceled>}
        </Info>
      </Left>

      {data.cancelable && !data.canceled_at && (
        <TouchableOpacity onPress={handleCancelAppointment}>
          <MaterialIcons name="event-busy" size={20} color="#f64c75" />
        </TouchableOpacity>
      )}
    </Container>
  );
}

Appointment.propTypes = {
  data: PropTypes.shape({
    past: PropTypes.bool,
    date: PropTypes.string,
    cancelable: PropTypes.bool,
    canceled_at: PropTypes.string,
    provider: PropTypes.shape({
      name: PropTypes.string,
      avatar: PropTypes.shape({
        url: PropTypes.string,
      }),
    }),
  }).isRequired,
  onCancel: PropTypes.func.isRequired,
};
