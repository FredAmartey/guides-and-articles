import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, Button } from 'react-native';
import appleAuth, {
  AppleButton,
  AppleAuthRequestOperation,
  AppleAuthRequestScope,
  AppleAuthCredentialState,
} from '@invertase/react-native-apple-authentication';

const AppleLoginScreen: React.FC = () => {

  useEffect(() => {
    // Listen for credentials revoked event
    // onCredentialRevoked returns a function that will remove the event listener. 
    // useEffect will call this function when the component unmounts
    const unsubscribe = appleAuth.onCredentialRevoked(async () => {
      // If this function executes, User Credentials have been Revoked
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const onAppleButtonPress = async () => {
    // Perform login request
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: AppleAuthRequestOperation.LOGIN,
      requestedScopes: [AppleAuthRequestScope.EMAIL, AppleAuthRequestScope.FULL_NAME],
    });

    // Get current authentication state for user
    const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);

    // Use credentialState response to ensure the user is authenticated
    if (credentialState === AppleAuthCredentialState.AUTHORIZED) {
      // User is authenticated
    } else {
      // Handle not authorized case
    }
  };

  const onLogout = async () => {
    // Perform logout request
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: AppleAuthRequestOperation.LOGOUT,
    });

    // Get current authentication state for user
    const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);

    // Use credentialState response to ensure the user credential's have been revoked
    if (credentialState === AppleAuthCredentialState.REVOKED) {
      // User is unauthenticated
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppleButton
        style={styles.appleButton}
        buttonStyle={AppleButton.Style.BLACK}
        buttonType={AppleButton.Type.SIGN_IN}
        onPress={onAppleButtonPress}
      />
      <Button title='Logout' onPress={onLogout} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  appleButton: {
    height: 40,
    width: '60%',
    marginBottom: 20
  }
});


export default AppleLoginScreen;