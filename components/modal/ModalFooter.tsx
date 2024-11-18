import { Button } from '../ui/button';

type Props = {
  onCancel: () => void;
  onConfirm: () => void;
};
export function ModalFooter({ onCancel, onConfirm }: Props) {
  return (
    <div>
      <Button variant="destructive" onClick={onConfirm}>
        Delete
      </Button>
      <Button onClick={onCancel}>Cancel</Button>
    </div>
  );
}
