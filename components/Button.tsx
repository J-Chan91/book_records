type Props = {
  title: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button(props: Props) {
  const { title, ...rest } = props;

  return <button {...rest}>{title}</button>;
}
