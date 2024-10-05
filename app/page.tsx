import TeamGenerator from './TeamGenerator'

export function Card(props: React.HTMLAttributes<HTMLDivElement>) {
  return <div {...props} className={`bg-white shadow rounded-lg ${props.className}`} />;
}

export function CardHeader(props: React.HTMLAttributes<HTMLDivElement>) {
  return <div {...props} className={`px-4 py-5 border-b border-gray-200 ${props.className}`} />;
}

export function CardContent(props: React.HTMLAttributes<HTMLDivElement>) {
  return <div {...props} className={`px-4 py-5 ${props.className}`} />;
}

export function CardTitle(props: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 {...props} className={`text-lg font-medium leading-6 text-gray-900 ${props.className}`} />;
}

export default function Page() {
  return <TeamGenerator />;
}