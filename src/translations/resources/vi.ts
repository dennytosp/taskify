export default {
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
    somethingHappened: 'Có lỗi xảy ra',
    tryAgain: 'Thử lại',
    haveError: 'Something went wrong. Please try again',
    errorOnRequest: 'An error occurred while sending the request',
    errorOnHandle: 'An error occurred while processing data',
    errorNetwork: 'No internet connection',
    errorGetPermission: 'Reconnected to the internet',
    contentNoInternet:
      'Vui lòng bật kết nối mạng Wi-Fi hoặc dữ liệu di động và thử lại sau',
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
      'Vui lòng không dùng ký tự đặc biệt (eg:!, @, #, $, %, ^, &, *)',
  },
  system: {
    successful: 'Thành công',
    ok: 'Đồng ý',
    close: 'Đóng',
    save: 'Lưu',
    cancel: 'Hủy',
    confirm: 'Xác nhận',
    proceed: 'Tiếp tục',
    add: 'Thêm',
    done: 'Hoàn tất',
    delete: 'Xoá',
    edit: 'Chỉnh sửa',
    yes: 'Có',
    no: 'Không',
    update: 'Cập nhật',
  },
  dialog: {
    notification: 'Thông báo',
    loading: 'Đang tải',
    update: 'Cập nhật',
    logout: 'Đăng xuất',
    timeOut: 'Hết thời gian',
    notInteractIn15Mins:
      'Bạn đã được tự động đăng xuất vì không có hoạt động nào trong ứng dụng trong 15 phút',
    forceUpdate: 'Đã có phiên bản ứng dụng mới. Vui lòng cập nhật!',
    thereWasAnUnexpectedError: 'Đã có lỗi xảy ra',
    theSystemHasEncounteredAnError:
      'Hệ thống xảy ra lỗi. Vui lòng thử lại sau.',
    appPermissionDenied: 'App permission denied',
    toReEnablePleaseGoSetting:
      'Để kích hoạt lại, vui lòng vào Cài đặt và bật chế độ Thông báo cho ứng dụng này',
  },
  darkMode: {
    system: 'Hệ thống',
    light: 'Sáng',
    dark: 'Tối',
  },
};