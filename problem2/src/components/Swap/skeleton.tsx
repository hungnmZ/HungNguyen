import { Skeleton } from 'components/ui/skeleton';

export default function SwapSkeleton() {
  return (
    <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 min-w-[500px] max-w-2xl p-4 bg-white rounded-lg shadow-md'>
      <div className='flex justify-between items-center mb-4'>
        <Skeleton className='h-6 w-24' />
        <Skeleton className='h-5 w-5' />
      </div>
      <div className='space-y-4'>
        <div className='flex items-center justify-between p-4 bg-gray-100 rounded-lg'>
          <div className='flex items-center space-x-2'>
            <Skeleton className='h-8 w-24' />
          </div>
          <div className='text-right'>
            <Skeleton className='h-6 w-16' />
            <Skeleton className='h-4 w-24' />
          </div>
        </div>
        <div className='flex justify-center'>
          <Skeleton className='h-5 w-5' />
        </div>
        <div className='flex items-center justify-between p-4 bg-gray-100 rounded-lg'>
          <div className='flex items-center space-x-2'>
            <Skeleton className='h-8 w-24' />
          </div>
          <div className='text-right'>
            <Skeleton className='h-6 w-16' />
            <Skeleton className='h-4 w-24' />
          </div>
        </div>
      </div>
      <div className='flex justify-between items-center mt-4'>
        <Skeleton className='h-4 w-32' />
      </div>
      <Skeleton className='h-10 w-full mt-4' />
    </div>
  );
}
