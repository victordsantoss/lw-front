import { useState } from 'react';
import { useRouter } from 'next/navigation';

export const useAccountTableCardModel = () => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handleOpenPopover = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const onView = (accountId: string) => {
    handleClosePopover();
    router.push(`/movements?accountId=${accountId}`);
  };

  const onEdit = (id: string) => {
    handleClosePopover();
    console.log('Edit account:', id);
  };

  const onDelete = (id: string) => {
    handleClosePopover();
    console.log('Delete account:', id);
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
