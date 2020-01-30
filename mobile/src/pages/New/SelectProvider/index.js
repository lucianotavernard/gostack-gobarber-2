import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';

import api from '~/services/api';

import Background from '~/components/Background';

import { Container, ProviderList, Provider, Avatar, Name } from './styles';

export default function SelectProvider({ navigation }) {
  const [providers, setProviders] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  async function loadProviders() {
    const response = await api.get('providers');

    setProviders(response.data);
  }

  useEffect(() => {
    loadProviders();
  }, []);

  async function refreshList() {
    setRefreshing(true);

    await loadProviders();

    setRefreshing(false);
  }

  function renderProvider({ item: provider }) {
    return (
      <Provider
        onPress={() => navigation.navigate('SelectDateTime', { provider })}
      >
        <Avatar
          source={{
            uri: provider.avatar
              ? provider.avatar.url
              : `https://api.adorable.io/avatars/50/${provider.name}.png`,
          }}
        />
        <Name>{provider.name}</Name>
      </Provider>
    );
  }

  return (
    <Background>
      <Container>
        <ProviderList
          data={providers}
          keyExtractor={provider => String(provider.id)}
          renderItem={renderProvider}
          onRefresh={refreshList}
          refreshing={refreshing}
        />
      </Container>
    </Background>
  );
}

SelectProvider.navigationOptions = ({ navigation }) => ({
  title: 'Selecione o prestador',
  headerLeft: () => (
    <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
      <MaterialIcons name="chevron-left" size={20} color="#fff" />
    </TouchableOpacity>
  ),
});

SelectProvider.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
