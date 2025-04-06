import { FC } from 'react';
import { Alert } from './Alert';
import { useTranslation } from '@/hooks/useTranslation';

export const UnexpectedErrorAlert: FC = () => {
  const { t } = useTranslation();

  return (
    <Alert
      variant={{ type: 'danger' }}
      title={t('components:UnexpectedErrorAlert.title')}
      content={t('components:UnexpectedErrorAlert.content')}
    />
  );
};
