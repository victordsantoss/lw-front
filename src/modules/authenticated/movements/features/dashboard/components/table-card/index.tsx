import { useMovementTableCardModel } from './table-card.model';
import { Movement } from '@/modules/authenticated/movements/services/movements.types';
import MovementTableCardView from './table-card.view';

interface IMovementCardViewModelProps {
  item: Movement.IListMovementItem;
}

const MovementTableCardViewModel = ({ item }: IMovementCardViewModelProps) => {
  const methods = useMovementTableCardModel();
  return <MovementTableCardView item={item} {...methods} />;
};

export default MovementTableCardViewModel;
