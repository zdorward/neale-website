import Link from "next/link";

interface PracticeAreaCardProps {
  title: string;
  description: string;
  href: string;
}

export default function PracticeAreaCard({
  title,
  description,
  href,
}: PracticeAreaCardProps) {
  return (
    <Link
      href={href}
      className="block bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-cream-dark"
    >
      <h3 className="font-serif text-xl text-sage-dark mb-2">{title}</h3>
      <p className="text-charcoal-light text-sm">{description}</p>
    </Link>
  );
}
