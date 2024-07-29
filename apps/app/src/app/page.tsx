import { SignOutButton } from '@clerk/nextjs';

const RootPage = () => {
  return (
    <div>
      <SignOutButton />
      <div>This page is just for authenticated</div>
    </div>
  );
};

// eslint-disable-next-line import/no-default-export
export default RootPage;
