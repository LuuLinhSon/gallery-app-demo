export interface InputBoxProps {
  classname?: string;
  title?: string;
  onChange: (values: React.ChangeEvent<HTMLInputElement>) => void;
}
