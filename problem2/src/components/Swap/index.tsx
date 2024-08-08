import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from 'components/ui/select';
import { Button } from 'components/ui/button';
import useSWR from 'swr';
import { fetcher } from 'lib/utils';
import { useState } from 'react';
import SwapSkeleton from './skeleton';
import { Input } from 'components/ui/input';
import { Loader2 } from 'lucide-react';

type TokenData = {
  currency: string;
  price: number;
};

export default function Swap() {
  const [tokens, setTokens] = useState<TokenData[] | null>(null);

  const [fromToken, setFromToken] = useState('ETH');
  const [toToken, setToToken] = useState('USD');

  const [fromValue, setFromValue] = useState<number>(0);
  const [toValue, setToValue] = useState<number>(0);

  const [loading, setLoading] = useState(false);

  const { isLoading } = useSWR<TokenData[]>('https://interview.switcheo.com/prices.json', fetcher, {
    onSuccess: (data) => {
      const uniqueTokens = data.reduce((list: TokenData[], token) => {
        if (list.some((item) => item.currency === token.currency)) {
          return list;
        }

        return [...list, token];
      }, []) as TokenData[];

      setTokens(uniqueTokens);
    },
  });

  const getCurrentPrice = (token: string) => {
    return tokens?.find((item) => item.currency === token)?.price.toFixed(6);
  };

  const getFromAmount = (token: string, value: number) => {
    return (Number(getCurrentPrice(token)) * value).toFixed(3);
  };

  const getRate = () => {
    return (Number(getCurrentPrice(fromToken)) / Number(getCurrentPrice(toToken))).toFixed(3);
  };

  const switchToken = () => {
    setFromValue(0);
    setToValue(0);
    setFromToken(toToken);
    setToToken(fromToken);
  };

  const onSwap = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  if (isLoading || !tokens) return <SwapSkeleton />;

  return (
    <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 min-w-[500px] max-w-2xl p-4 bg-white rounded-xl drop-shadow'>
      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-lg font-bold mx-2'>Swap</h2>
        <Button variant='ghost' size='icon'>
          <SettingsIcon className='w-5 h-5 text-muted-foreground' />
        </Button>
      </div>
      <div className='space-y-2'>
        <div className='flex items-center justify-between p-5 bg-gray-100 rounded-xl'>
          <div className='text-left'>
            <Input
              value={fromValue}
              onChange={(e: any) => {
                setFromValue(e.target.value);
                setToValue(+(e.target.value * Number(getRate())).toFixed(3));
              }}
              type='number'
              className='px-0 text-xl font-bold border-none bg-transparent !ring-transparent !ring-offset-0'
              placeholder='0'
            />
            <div className='mt-2 text-sm text-muted-foreground'>
              ~${getFromAmount(fromToken, fromValue as number)}
            </div>
          </div>
          <div className='text-right'>
            <SelectToken
              value={fromToken}
              defaultValue={fromToken}
              items={tokens?.map(({ currency }) => currency)}
              onValueChange={setFromToken}
            />
            <div className='mt-2 text-sm text-muted-foreground'>${getCurrentPrice(fromToken)}</div>
          </div>
        </div>
        <div className='flex justify-center'>
          <Button variant='ghost' size='icon' className='rounded-full' onClick={switchToken}>
            <ArrowLeftRightIcon className='w-5 h-5 text-muted-foreground rotate-90' />
          </Button>
        </div>
        <div className='flex items-center justify-between p-5 bg-gray-100 rounded-xl'>
          <div className='text-left'>
            <Input
              value={toValue}
              className='px-0 text-xl font-bold border-none bg-transparent !ring-transparent !ring-offset-0'
              placeholder='0'
              readOnly
            />
            <div className='mt-2 text-sm text-muted-foreground'>
              ~${getFromAmount(toToken, toValue as number)}
            </div>
          </div>
          <div className='text-right'>
            <SelectToken
              value={toToken}
              defaultValue={toToken}
              items={tokens?.map(({ currency }) => currency)}
              onValueChange={setToToken}
            />
            <div className='mt-2 text-sm text-muted-foreground'>${getCurrentPrice(toToken)}</div>
          </div>
        </div>
      </div>
      <div className='flex justify-end my-5'>
        <div className='text-sm text-muted-foreground'>
          1 {fromToken} = {getRate()} {toToken}
        </div>
      </div>
      <Button
        className='w-full rounded-xl bg-pink-500 text-white'
        onClick={onSwap}
        disabled={loading}
      >
        {loading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
        Swap
      </Button>
    </div>
  );
}

type SelectTokenProps = {
  items?: string[];
  defaultValue: string;
  value: string;
  onValueChange: (value: string) => void;
};

const SelectToken = ({ items, ...props }: SelectTokenProps) => {
  return (
    <Select {...props}>
      <SelectTrigger className='text-xl font-bold rounded-xl border-none !ring-transparent !ring-offset-0'>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {items?.map((item) => (
          <SelectItem key={item} value={item}>
            <div className='flex items-center space-x-2'>
              <img
                src={`/tokens/${item}.svg`}
                alt={item}
                width='24'
                height='24'
                className='rounded-full'
                style={{ aspectRatio: '24/24', objectFit: 'cover' }}
              />
              <span>{item}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

const ArrowLeftRightIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M8 3 4 7l4 4' />
      <path d='M4 7h16' />
      <path d='m16 21 4-4-4-4' />
      <path d='M20 17H4' />
    </svg>
  );
};

const SettingsIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z' />
      <circle cx='12' cy='12' r='3' />
    </svg>
  );
};
