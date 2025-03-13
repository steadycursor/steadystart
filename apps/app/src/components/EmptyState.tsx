import { CollectionsEmptyRegular } from '@fluentui/react-icons';
import { Div } from './Div';

export const EmptyState = () => {
  return (
    <Div className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center">
      <CollectionsEmptyRegular className="mx-auto size-16 text-gray-400" />
    </Div>
  );
};
