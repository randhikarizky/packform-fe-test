import { UseFormSetValue } from 'react-hook-form';

export const npwpInput = (e: any) => {
  const toNumber = e?.replace(/[^0-9.-]/g, '');
  const toNPWP = toNumber?.replace(
    /(\d{2})(\d{3})(\d{3})(\d{1})(\d{3})(\d{3})/,
    '$1.$2.$3.$4-$5.$6'
  );

  return toNPWP;
};

export const currencyInput = (
  e: string,
  input: string,
  setValue: UseFormSetValue<any>
) => {
  const toNumberFormat = e.replace(/[^0-9]/g, '');
  const currencyValue = new Intl.NumberFormat('id-ID', {
    minimumFractionDigits: 0,
  }).format(Number(toNumberFormat));

  return setValue(input, currencyValue);
};
