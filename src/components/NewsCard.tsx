import Link from "next/link";
import { PhotoIcon } from "@heroicons/react/24/outline";
import { isValidUrl } from "@/utils/isValidUrl";

interface NewsCardProps {
  title: string;
  description: string;
  urlToImage?: string;
}

const NewsCard = ({ title, description, urlToImage }: NewsCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {urlToImage && isValidUrl(urlToImage) ? (
        <img
          src={urlToImage}
          alt={title}
          className="w-full h-48 object-cover bg-gray-200"
          onError={(e) => (e.currentTarget.style.display = "none")}
          width={640}
          height={360}
        />
      ) : (
        <div className="w-full h-48 flex items-center justify-center bg-gray-200">
          <PhotoIcon className="w-16 h-16 text-gray-500" />
        </div>
      )}

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-4">{description}</p>
        <Link
          href={`/news/${encodeURIComponent(title)}`}
          className="text-blue-500 hover:underline text-sm"
        >
          Read more
        </Link>
      </div>
    </div>
  );
};

export default NewsCard;
