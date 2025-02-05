import { Button, ButtonProps } from './Button';

type SubmitButtonProps = Omit<ButtonProps, 'children' | 'type'>;

export const SubmitButton = (props: SubmitButtonProps) => {
  return (
    <Button type="submit" {...props}>
      Submit
    </Button>
  );
};
