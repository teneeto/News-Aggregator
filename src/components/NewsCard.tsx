import Link from "next/link";

interface NewsCardProps {
  title: string;
  description: string;
  link: string;
  image?: string; // Optional image
}

const NewsCard = ({ title, description, link, image }: NewsCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {image && (
        <img src={image} alt={title} className="w-full h-48 object-cover" />
      )}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-4">{description}</p>
        <Link href={link} className="text-blue-500 hover:underline text-sm">
          Read more
        </Link>
      </div>
    </div>
  );
};

export default NewsCard;
