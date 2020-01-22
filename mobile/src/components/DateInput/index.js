import React, { useState, useMemo } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';

import { format } from 'date-fns';

import { Container, DateButton, DateText, Picker } from './styles';

export default function DateInput({ value, onChange }) {
  const [opened, setOpenPicker] = useState(false);

  const dateFormatted = useMemo(() => format(value, 'dd/MMMM/yyyy'), [value]);

  function handleClick() {
    setOpenPicker(true);
  }

  function handleChange(event, date) {
    setOpenPicker(false);
    onChange(date || new Date());
  }

  return (
    <Container>
      <DateButton onPress={handleClick}>
        <MaterialIcons name="event" color="#fff" size={20} />
        <DateText>{dateFormatted}</DateText>
      </DateButton>

      {opened && (
        <Picker>
          <DateTimePicker
            value={value}
            onChange={handleChange}
            minimumDate={new Date()}
            minuteInterval={60}
            display="spinner"
            mode="date"
            locale="pt"
          />
        </Picker>
      )}
    </Container>
  );
}

DateInput.propTypes = {
  value: PropTypes.instanceOf(Date).isRequired,
  onChange: PropTypes.func.isRequired,
};
