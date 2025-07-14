import { useState } from 'react';

export const useAccountTableCardModel = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handleOpenPopover = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const onView = (id: string) => {
    console.log(id);
  };
  const onEdit = (id: string) => {
    console.log(id);
  };

  const onDelete = (id: string) => {
    console.log(id);
  };

  return {
    anchorEl,
    handleOpenPopover,
    handleClosePopover,
    open,
    id,
    onView,
    onEdit,
    onDelete,
  };
};
