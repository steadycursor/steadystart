export const ExampleCustomEnum = {
  CUSTOM_ENUM_VALUE: 'CUSTOM_ENUM_VALUE',
} as const;

export type ExampleCustomEnum = keyof typeof ExampleCustomEnum;
