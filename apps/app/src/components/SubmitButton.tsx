import { Button, ButtonProps } from './Button';
import { useTranslation } from '@/hooks/useTranslation';

type SubmitButtonProps = Omit<ButtonProps, 'children' | 'type'>;

export const SubmitButton = (props: SubmitButtonProps) => {
  const { t } = useTranslation();

  return (
    <Button type="submit" {...props}>
      {t('components:SubmitButton.title')}
    </Button>
  );
};
