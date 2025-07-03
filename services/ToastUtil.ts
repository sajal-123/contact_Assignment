import { Toast } from 'toastify-react-native';

type ToastType = 'success' | 'error' | 'info';
type ToastPosition = 'top' | 'bottom';

interface ShowToastOptions {
  message: string;
  type?: ToastType;
  duration?: number; // in milliseconds
  position?: ToastPosition;
}

export const showToast = ({
  message,
  type = 'info',
  duration = 3000,
  position = 'bottom',
}: ShowToastOptions) => {
  switch (type) {
    case 'success':
      Toast.success(message, position, duration);
      break;
    case 'error':
      Toast.error(message, position, duration);
      break;
    case 'info':
    default:
      Toast.info(message, position, duration);
      break;
  }
};

