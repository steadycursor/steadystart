import { Alert } from './Alert';

export const UnexpectedErrorAlert = () => {
  return (
    <Alert
      variant={{ type: 'danger' }}
      title="Oops! We ran into a problem. Try reloading the page or coming back later."
      content="Something went wrong while loading the data. This might be a temporary issue, so please try again in a moment. If the problem persists, feel free to contact us for assistance."
    />
  );
};
