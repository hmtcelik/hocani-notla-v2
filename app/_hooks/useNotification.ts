import { notifications } from '@mantine/notifications';

function useNotification() {
  const showNotification = (
    type: 'error' | 'success' | 'custom',
    message: string,
    color?: string
  ) => {
    let c;
    switch (type) {
      case 'error':
        c = 'red';
        break;
      case 'success':
        c = 'green';
        break;
      default:
        c = color || 'blue';
        break;
    }
    notifications.show({
      message,
      color: c,
    });
  };

  return showNotification;
}

export default useNotification;
