import Link from "next/link";

interface NewsCardProps {
  title: string;
  description: string;
  link: string;
}

const NewsCard = ({ title, description, link }: NewsCardProps) => {
  return (
    <div className="news-card">
      <h3>{title}</h3>
      <p>{description}</p>
      <Link href={link}>
        <a>Read more</a>
      </Link>
    </div>
  );
};

export default NewsCard;
