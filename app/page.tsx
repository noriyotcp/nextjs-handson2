import Image from "next/image";
import { getRandomPhotos } from "@/lib/unsplash";
import { Search } from "@/lib/component/Search";

const Home = async () => {
  const randomPhotos = await getRandomPhotos();

  return (
    <>
      <div>
        <Search />
      </div>
      <div className="grid grid-cols-3 gap-4 w-[1200px] mx-auto">
        {[0, 1, 2].map((columnIndex) => (
          <div key={columnIndex}>
            {randomPhotos.map((photo, photoIndex) => {
              if (photoIndex % 3 !== columnIndex) {
                return (
                  <div key={photo.id} className="mb-4 last:mb-0">
                    <Image
                      src={photo.urls.small}
                      width={400}
                      height={photo.height * (400 / photo.width)}
                      alt={photo.description}
                    />
                  </div>
                );
              }
              return null;
            })}
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
