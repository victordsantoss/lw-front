import { IPaginatedResponse } from '@/common/types/base-pagination.types';
import TableView from './table.view';
import { useTableModel } from './table.model';
import React from 'react';

interface ITableViewModelProps<T> {
  content: IPaginatedResponse<T>;
  renderItem: (item: T) => React.ReactNode;
  itemSize?: {
    xs?: string;
    sm?: string;
    md?: string;
    lg?: string;
    xl?: string;
  };
}

const TableViewModel = <T,>({ content, renderItem, itemSize }: ITableViewModelProps<T>) => {
  const methods = useTableModel({ limit: content.meta.limit, page: content.meta.page });

  return <TableView content={content} itemSize={itemSize} renderItem={renderItem} {...methods} />;
};

export default TableViewModel;
