export interface IConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
  onConfirm: () => void;
}
