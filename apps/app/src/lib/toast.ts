import * as ReactHotToast from 'react-hot-toast';

type ToastPayloadMethodArgs = {
  message: string;
};

export const toast = {
  success: (args: ToastPayloadMethodArgs) => ReactHotToast.toast.success(args.message),
  warning: (args: ToastPayloadMethodArgs) => ReactHotToast.toast.error(args.message),
};
