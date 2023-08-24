import { notifications } from '@mantine/notifications';

function useNotification() {
  const showNotification = (
    type: 'error' | 'success' | 'custom',
    message: string,
    color?: string
  ) => {
    let c = color || (type === 'error' ? 'red' : 'green');
    if (type === 'custom') c = color || 'blue';

    notifications.show({
      message,
      color,
    });
  };

  return showNotification;
}

export default useNotification;
