import Link from "next/link";

interface NewsCardProps {
  title: string;
  description: string;
  link: string;
}

const NewsCard = ({ title, description, link }: NewsCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-4">
      <h3 className="text-xl font-semibold text-blue-600 mb-2">{title}</h3>
      <p className="text-gray-700 mb-4">{description}</p>
      <Link
        href={link}
        className="text-blue-500 hover:text-blue-700 font-medium"
      >
        Read more
      </Link>
    </div>
  );
};

export default NewsCard;
