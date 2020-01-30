import React from 'react';

import {
  AppointmentsContainer,
  AppointmentCards,
  AppointmentCard,
  AppointmentPicturePlaceholder,
  AppointmentInfoContainer,
  AppointmentInfoNamePlaceholder,
  AppointmentInfoTimePlaceholder,
} from './styles';

export default function AppointmentPlaceholder() {
  function renderCards() {
    return [1, 2, 3].map(item => (
      <AppointmentsContainer key={`appointment-card-placeholder-${item}`}>
        <AppointmentCard>
          <AppointmentPicturePlaceholder autoRun />

          <AppointmentInfoContainer>
            <AppointmentInfoNamePlaceholder autoRun />
            <AppointmentInfoTimePlaceholder autoRun />
          </AppointmentInfoContainer>
        </AppointmentCard>
      </AppointmentsContainer>
    ));
  }

  return <AppointmentCards>{renderCards()}</AppointmentCards>;
}
