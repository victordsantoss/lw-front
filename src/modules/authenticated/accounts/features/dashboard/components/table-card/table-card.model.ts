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

  const handleView = (accountId: string) => {
    handleClosePopover();
    router.push(`/movements?accountId=${accountId}`);
  };

  const handleAddBalance = (accountId: string) => {
    handleClosePopover();
    router.push(`/movements/register?type=deposit&accountId=${accountId}`);
  };

  const handleTransfer = (accountId: string) => {
    handleClosePopover();
    router.push(`/movements/register?type=transfer&accountId=${accountId}`);
  };

  const handleWithdraw = (accountId: string) => {
    handleClosePopover();
    router.push(`/movements/register?type=withdraw&accountId=${accountId}`);
  };

  return {
    anchorEl,
    handleOpenPopover,
    handleClosePopover,
    open,
    id,
    handleView,
    handleAddBalance,
    handleTransfer,
    handleWithdraw,
  };
};
