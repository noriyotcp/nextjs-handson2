"use client";

import { FunctionComponent, useState, useTransition } from "react";
import { VscSearch } from "react-icons/vsc";
import { Photo, PhotoSearchResponse } from "../types";
import { Loading } from "./Loading";
import { PhotoList } from "./PhotoList";

const PhotoListWrapper: FunctionComponent<{
  loading: boolean;
  searchPhotos: Photo[] | null;
  randomPhotos: Photo[];
}> = ({ loading, searchPhotos, randomPhotos }) => {
  if (loading) {
    return <Loading />;
  }
  if (searchPhotos) {
    return <PhotoList photos={searchPhotos} />;
  }
  return <PhotoList photos={randomPhotos} />;
};

export const Search: FunctionComponent<{
  randomPhotos: Photo[];
}> = ({ randomPhotos }) => {
  const [query, setQuery] = useState<string | null>(null);
  const [searching, setSearching] = useState<boolean>(false);
  const [searchedPhotos, setSearchedPhotos] = useState<Photo[] | null>(null);
  const [loading, startTransition] = useTransition();

  return (
    <div>
      <div className="my-8 flex justify-center">
        <input
          className="w-96 mr-4 p-2 bg-gray-700"
          value={query ?? ""}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          className=" bg-gray-700 py-2 px-4"
          onClick={async () => {
            setSearching(true);

            const response = await fetch(`http://localhost:3000/api/search`, {
              method: "POST",
              body: JSON.stringify({ query }),
              headers: {
                "Content-Type": "application/json",
              },
            });
            const json: PhotoSearchResponse = await response.json();
            startTransition(() => {
              setSearchedPhotos(json.results);
              setSearching(false);
            });
          }}
        >
          <VscSearch />
        </button>
      </div>
      <PhotoListWrapper
        loading={searching || loading}
        searchPhotos={searchedPhotos}
        randomPhotos={randomPhotos}
      />
    </div>
  );
};
