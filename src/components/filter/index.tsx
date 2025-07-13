import { useFilterModel } from './filter.model';
import { Option } from './filter.types';
import { FilterView } from './filter.view';

interface IFilterViewModelProps {
  onRegisterClick: () => void;
  orderOptions: Option[];
  searchPlaceholder: string;
  AdvancedFilter?: React.ReactNode;
}

const FilterViewModel = ({
  onRegisterClick,
  orderOptions,
  searchPlaceholder,
  AdvancedFilter,
}: IFilterViewModelProps) => {
  const methods = useFilterModel({ orderOptions });
  return (
    <FilterView
      onRegisterClick={onRegisterClick}
      searchPlaceholder={searchPlaceholder}
      AdvancedFilter={AdvancedFilter}
      {...methods}
    />
  );
};

export default FilterViewModel;
