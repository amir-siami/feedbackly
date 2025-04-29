type Props = {
  error: string | Error | null;
};

export const ErrorDisplay = ({ error }: Props) => {
  if (!error) return null;
  return <p>{typeof error === "string" ? error : error.message}</p>;
};
