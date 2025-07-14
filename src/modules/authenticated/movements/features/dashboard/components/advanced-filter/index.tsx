'use client';

import { useAdvancedFilterModel } from './advanced-filter.model';
import { AdvancedFilterView } from './advanced-filter.view';

const AdvancedFilterViewModel = () => {
  const methods = useAdvancedFilterModel();

  return <AdvancedFilterView {...methods} />;
};

export default AdvancedFilterViewModel;
