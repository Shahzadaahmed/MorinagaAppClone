const firebaseAuthErrors = {
  'auth/invalid-email': 'Please enter a valid email address.',
  'auth/user-disabled':
    'Your account has been disabled. Please contact support for assistance.',
  'auth/user-not-found':
    'The user account was not found. Please check your email or sign up for a new account.',
  'auth/wrong-password': 'Incorrect password. Please try again.',
  'auth/email-already-in-use':
    'This email is already registered. Please use a different email address or try logging in.',
  'auth/weak-password':
    'Your password is too weak. It should be at least 6 characters long.',
  'auth/operation-not-allowed':
    'This authentication method is not allowed. Please try a different method.',
  'auth/account-exists-with-different-credential':
    'An account already exists with this email, but using a different sign-in method.',
  'auth/network-request-failed':
    'There is a problem with your internet connection. Please check your network settings and try again.',
  'auth/too-many-requests':
    'We have received too many requests from your device. Please wait a moment and try again.',
  'auth/requires-recent-login':
    'This action requires you to log in again. Please log in and try again.',
  'auth/user-mismatch': "The logged-in user doesn't match the requested user.",
  'auth/provider-already-linked':
    'This account is already linked with another provider.',
  'auth/unauthorized-domain':
    'This domain is not authorized for OAuth authentication.',
  'auth/operation-not-supported-in-this-environment':
    'This operation is not supported in this environment.',
  'auth/cancelled-popup-request':
    'The sign-in popup was canceled before completing the operation.',
  'auth/popup-blocked':
    'The sign-in popup was blocked by your browser. Please enable popups and try again.',
  'auth/popup-closed-by-user':
    'The sign-in popup was closed by the user before completing the operation.',
  'auth/unauthorized-continue-uri':
    'The domain of the continue URL is not whitelisted. Please contact support for assistance.',
  'auth/internal-error':
    'Oops! Something went wrong on our end. Please try again later.',
};

export default firebaseAuthErrors;
