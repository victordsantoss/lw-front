import { useAccountTableCardModel } from '@/modules/authenticated/accounts/features/dashboard/components/table-card/table-card.model';
import AccountTableCardView from './table-card.view';
import { Account } from '@/modules/authenticated/accounts/services/accounts/accounts.types';

interface IAccountCardViewModelProps {
  item: Account.IListAccountItem;
}

const AccountTableCardViewModel = ({ item }: IAccountCardViewModelProps) => {
  const methods = useAccountTableCardModel();
  return <AccountTableCardView item={item} {...methods} />;
};

export default AccountTableCardViewModel;
