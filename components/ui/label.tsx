export function Label(props: React.LabelHTMLAttributes<HTMLLabelElement>) {
    return <label {...props} className={`font-medium ${props.className}`} />;
  }