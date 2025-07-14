'use client';

import { MovementDashboardView } from './dashboard.view';
import { useMovementDashboardModel } from './dashboard.model';
import { Movement } from '../../services/movements.types';

interface IMovementDashboardViewModelProps {
  content: Movement.IListMovementsResponse;
}

const MovementDashboardViewModel = ({ content }: IMovementDashboardViewModelProps) => {
  const methods = useMovementDashboardModel();

  return <MovementDashboardView content={content} {...methods} />;
};

export default MovementDashboardViewModel;
