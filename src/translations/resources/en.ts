export default {
  app: {
    name: 'Taskify',
  },
  error: {
    '400': 'Bad Request. Please Check Your Request',
    '401': 'Unauthorized. Please Login Again',
    '402': 'Too Many Requests Have Been Sent',
    '403': 'Forbidden',
    '404': 'Not Found',
    '405': 'Method Not Allowed',
    '406': 'Not Acceptable',
    '407': 'Proxy Authentication Required',
    '408': 'Request Timeout',
    '500': 'Internal Server Error',
    '501': 'Not Implemented',
    '502': 'Bad Gateway',
    '503': 'Service Unavailable',
    '504': 'Gateway Timeout',
    '505': 'HTTP Version Not Supported',
    somethingHappened: 'Something happened!',
    tryAgain: 'Try again',
    haveError: 'Something went wrong. Please try again',
    errorOnRequest: 'An error occurred while sending the request',
    errorOnHandle: 'An error occurred while processing data',
    errorNetwork: 'No internet connection',
    errorGetPermission: 'Reconnected to the internet',
    contentNoInternet:
      'Please make sure to turn on Wi-Fi or mobile data, then try again',
  },
  validation: {
    require: 'Required field',
    email: 'Invalid email',
    cea: 'Invalid CEA License No.',
    zipCode: 'Invalid ZipCode',
    min: 'Contains at least {{value}} characters',
    max: 'No more than {{value}} characters in length',
    length: 'Length must be {{value}} characters',
    number: 'Please enter the number of only',
    safeCharacter: 'Invalid characters',
    phone: 'Invalid phone number',
    confirmPass: 'Password does not match',
    password: 'Invalid password',
    phoneNotExist: 'Phone number does not exist',
    pleaseDoNotInputSpecialCharacter:
      'Please do not input special character (eg:!, @, #, $, %, ^, &, *)',
  },
  system: {
    successful: 'Successful',
    ok: 'Ok',
    close: 'Close',
    save: 'Save',
    cancel: 'Cancel',
    confirm: 'Confirm',
    proceed: 'Proceed',
    add: 'Add',
    done: 'Done',
    delete: 'Delete',
    edit: 'Edit',
    yes: 'Yes',
    no: 'No',
    update: 'Update',
  },
  dialog: {
    notification: 'Notification',
    loading: 'Loading',
    update: 'Update',
    logout: 'Log out',
    timeOut: 'Time out',
    notInteractIn15Mins:
      'You are logged out automatically since you did not interact within the app for 15 minutes',
    forceUpdate: 'There is a new version of the app. Please update now',
    thereWasAnUnexpectedError: 'There was an unexpected error',
    theSystemHasEncounteredAnError:
      'The system has encountered an error. Please try again later.',
    appPermissionDenied: 'App permission denied',
    toReEnablePleaseGoSetting:
      'To re-enable, please go to Settings and turn on Notification Service for this app',
  },
  darkMode: {
    system: 'System',
    light: 'Light',
    dark: 'Dark',
  },
  taskify: {
    getStarted: {
      title: 'Welcome to',
      content: 'The best to-do list app for you.',
      button: 'Get Started',
    },
    auth: {
      lets: `Let's`,
      signIn: 'Sign In',
      signUp: 'Sign Up',
      forgotPassword: 'Forgot password',
      headerSubtitle: 'Taskify improves work quality',
      emailAddress: 'Email address',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      enterEmail: 'Enter your email address',
      enterPassword: 'Enter your password',
      enterConfirmPassword: 'Enter your password again',
      or: 'Or',
      dontHaveAnAccount: 'Don’t have an account?',
      createYour: 'Create your',
      account: 'Account',
      fullName: 'Full name',
      enterFullName: 'Enter your full name',
      alreadyHaveAnAccount: 'Already have an account?',
      pleaseVerifyYourEmail: 'Please verify your email address',
      didYouRememberThePassword: 'Did you remember the password?',
      verify: 'Verify',
    },
  },
};
