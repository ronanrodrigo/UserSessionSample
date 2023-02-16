/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect, useState, type PropsWithChildren} from 'react';
import {
  NativeModules,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Colors, Header} from 'react-native/Libraries/NewAppScreen';

const {UserBridge} = NativeModules;
const {NetworkBridge} = NativeModules;

const Section: React.FC<
  PropsWithChildren<{
    title: string;
  }>
> = ({children, title}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [user, setUser] = useState({});
  useEffect(() => {
    // UserBridge.getUser().then((receivedUser: {}) => {
    //   setUser(receivedUser);
    // });
    load();
  }, []);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  async function load() {
    try {
      const endPoint = {
        path: '/path',
        method: 'POST',
        parameters: {parameter: 'parameter'},
        body: {body: 'body'},
        customHeaders: {custom: 'CustomHeader'},
      };
      const userTeste = await NetworkBridge.execute(endPoint, 'defaultKeys');
      setUser(userTeste);
      console.log(`Created a new event with id ${userTeste}`);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="I know you!">
            <>
              Your business name is{' '}
              <Text style={styles.highlight}>{user.businessName}</Text>! This
              was retrieve by a native module using getUser method.
            </>
          </Section>
          <Section title="Received object">
            <Text style={styles.code}>{JSON.stringify(user, null, 2)}</Text>
            {'\n'}
          </Section>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  code: {
    fontFamily: 'Courier',
  },
});

export default App;
