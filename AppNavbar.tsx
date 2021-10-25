import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';

const Accueil = () => <Text>Acceuil</Text>
const Profil = () => <Text>Profil</Text>

const AppNavbar = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'main', title: 'Accueil', icon: 'home' },
    { key: 'profile', title: 'Profil', icon: 'human-male' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    main: Accueil,
    profile: Profil
  })

  return(
    <BottomNavigation
        navigationState={{index, routes}}
        onIndexChange={setIndex}
        renderScene={renderScene}
    />
  )
}

export default AppNavbar;