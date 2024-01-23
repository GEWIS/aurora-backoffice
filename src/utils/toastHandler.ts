import { app } from '@/main';

export interface ToastMessage {
  title: string;
  body: string;
  lifeTime?: number;
}

enum ToastSeverity {
  SUCCESS = 'success',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error'
}

export function toast(severity: ToastSeverity, message: ToastMessage) {
  app.config.globalProperties.$toast.add({
    severity: severity,
    summary: message.title,
    detail: message.body,
    life: message.lifeTime ?? 5000
  });
}

export function toastSuccess(message: ToastMessage): void {
  toast(ToastSeverity.SUCCESS, message);
}

export function toastInfo(message: ToastMessage): void {
  toast(ToastSeverity.INFO, message);
}

export function toastWarn(message: ToastMessage): void {
  toast(ToastSeverity.WARN, message);
}

export function toastError(message: ToastMessage): void {
  toast(ToastSeverity.ERROR, message);
}
