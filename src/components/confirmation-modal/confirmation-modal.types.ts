export interface IConfirmationModalProps {
  /** Controla se o modal está aberto ou fechado */
  open: boolean;
  /** Função chamada quando o modal é fechado */
  onClose: () => void;
  /** Título do modal */
  title?: string;
  /** Mensagem principal do modal */
  message?: string;
  /** Função chamada quando o botão confirmar é clicado */
  onConfirm: () => void;
}
