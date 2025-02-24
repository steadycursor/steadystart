import { tv } from 'tailwind-variants';
import { match } from 'ts-pattern';
import { Info48Filled, Warning48Filled, ErrorCircle48Filled, CheckmarkCircle48Filled } from '@fluentui/react-icons';
import { Div, DivProps } from './Div';

export type AlertProps = {
  title: string;
  content?: string;
  variant?: Parameters<typeof variants>[0];
  isDisabled?: boolean;
} & DivProps;

const variants = tv({
  slots: {
    base: 'rounded-md p-4 border',
    icon: 'size-5',
    title: 'text-sm font-medium',
    content: 'mt-2 text-sm',
  },
  variants: {
    type: {
      info: {
        base: 'bg-blue-50 border-blue-300',
        icon: 'text-blue-700',
        title: 'text-blue-800',
        content: 'text-blue-700',
      },
      warning: {
        base: 'bg-yellow-50 border-yellow-300',
        icon: 'text-yellow-700',
        title: 'text-yellow-800',
        content: 'text-yellow-700',
      },
      danger: {
        base: 'bg-red-50 border-red-300',
        icon: 'text-red-700',
        title: 'text-red-800',
        content: 'text-red-700',
      },
      success: {
        base: 'bg-green-50 border-green-300',
        icon: 'text-green-700',
        title: 'text-green-800',
        content: 'text-green-700',
      },
    },
  },
  defaultVariants: {
    type: 'info',
  },
});

export const Alert = ({ title, content, variant, ...props }: AlertProps) => {
  const styles = variants({ ...variant });

  return (
    <Div {...props} className={styles.base()}>
      <Div className="flex items-center">
        <Div className="shrink-0">
          {match(variant?.type)
            .with('info', undefined, () => <Info48Filled className={styles.icon()} />)
            .with('success', () => <CheckmarkCircle48Filled className={styles.icon()} />)
            .with('warning', () => <Warning48Filled className={styles.icon()} />)
            .with('danger', () => <ErrorCircle48Filled className={styles.icon()} />)
            .exhaustive()}
        </Div>
        <Div className="ml-3">
          <h3 className={styles.title()}>{title}</h3>
          {content && (
            <Div className={styles.content()}>
              <p>{content}</p>
            </Div>
          )}
        </Div>
      </Div>
    </Div>
  );
};
