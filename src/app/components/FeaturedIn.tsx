import React from "react";
import Image from "next/image";

const brands = [
  {
    name: "Spotify",
    image: "/images/spotifyimg.jpg",
    url: "https://open.spotify.com/show/1iWZU3xvTTwtoOUHIg3BeF",
  },

  {
    name: "LikeMedia",
    image: "/images/likemediaimg.jpg",
    url: "https://www.youtube.com/watch?v=CX2H8kj5VAo&t=520s",
  },
  {
    name: "Youtube",
    image: "/images/youtubeimg.jpg",
    url: "https://www.youtube.com/@lancemonosnomas",
  },
  {
    name: "Apple Podcast",
    image: "/images/applepodcastimg.jpg",
    url: "https://podcasts.apple.com/cl/podcast/lancémonos-nomás-seducción-en-una-conversación/id1521946856",
  },
];

const FeaturedIn: React.FC = () => {
  return (
    <section className="py-12 bg-gray-800 rounded">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center text-white mb-8">
          VISTO EN
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {brands.map((brand) => (
            <div key={brand.name} className="text-center">
              <a
                href={brand.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div className="bg-white rounded-full p-4 inline-block mb-4">
                  <Image
                    src={brand.image}
                    alt={`${brand.name} logo`}
                    width={64}
                    height={64}
                  />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {brand.name}
                </h3>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedIn;
