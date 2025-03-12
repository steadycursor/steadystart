import { Page } from '@/components/Page';
import { UpdateUserLocaleForm } from '@/forms/UpdateUserLocaleForm';
import { useTranslation } from '@/hooks/useTranslation';

export const ProfilePage = () => {
  const { t } = useTranslation();

  return (
    <Page title={t('components:ProfilePage.Page.title')}>
      <UpdateUserLocaleForm />
    </Page>
  );
};

export default ProfilePage;
