import Image from "next/image";
import { getRandomPhotos } from "@/lib/unsplash";
import { Search } from "@/lib/component/Search";

const Home = async () => {
  const randomPhotos = await getRandomPhotos();

  return (
    <div>
      <Search />
    </div>
  );
};

export default Home;
