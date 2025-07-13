import { Stack, Skeleton } from '@mui/material';

const skeletonBase = {
  bgcolor: 'primary.contrastText',
} as const;

export default function TableSkeleton() {
  const rows = 5;
  const columns = 4;

  return (
    <Stack spacing={1} sx={{ width: '100%' }}>
      <Stack gap={2} display="flex" flexDirection="row" justifyContent="space-between">
        <Skeleton
          variant="text"
          sx={{ ...skeletonBase, fontSize: '2rem', width: { xs: '100%', md: '60%' } }}
        />
        <Skeleton
          variant="text"
          sx={{ ...skeletonBase, fontSize: '2rem', display: { xs: 'none', md: 'flex' } }}
          width={'20%'}
        />
        <Skeleton
          variant="text"
          sx={{ ...skeletonBase, fontSize: '2rem', display: { xs: 'none', md: 'flex' } }}
          width={'20%'}
        />
      </Stack>
      <Stack
        gap={{ xs: 1, md: 2 }}
        display="flex"
        sx={{
          flexDirection: { xs: 'column', md: 'row' },
        }}
        justifyContent="space-between"
      >
        <Skeleton
          variant="text"
          sx={{ ...skeletonBase, fontSize: '2rem', width: { xs: '100%', md: '30%' } }}
        />
        <Skeleton
          variant="text"
          sx={{ ...skeletonBase, fontSize: '2rem', width: { xs: '100%', md: '30%' } }}
        />
        <Skeleton
          variant="text"
          sx={{ ...skeletonBase, fontSize: '2rem', width: { xs: '100%', md: '30%' } }}
        />
      </Stack>

      <Stack gap={{ xs: 1, md: 2 }}>
        {Array.from({ length: rows }).map((_, row) => (
          <Stack key={row} direction="row" gap={{ xs: 1, md: 2 }}>
            {Array.from({ length: columns }).map((_, col) => (
              <Skeleton
                key={col}
                variant="rectangular"
                width="100%"
                height={100}
                sx={skeletonBase}
              />
            ))}
          </Stack>
        ))}
      </Stack>

      <Stack justifyContent="center" direction="row">
        <Stack direction="row" gap={{ xs: 1, md: 2 }}>
          {Array.from({ length: 2 }).map((_, i) => (
            <Skeleton
              key={i}
              variant="text"
              sx={{ ...skeletonBase, fontSize: '2rem' }}
              width={100}
            />
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
}
