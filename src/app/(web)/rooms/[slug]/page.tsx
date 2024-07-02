"use client";
import { getRoom } from "@/libs/apis";
import useSWR from "swr";
import LoadingSpinner from "../../loading";
import HotelPhotoGallery from "@/components/HotelPhotoGallery/HotelPhotoGallery";
import { MdOutlineCleaningServices } from "react-icons/md";

const RoomDetails = ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const fetchRoom = async () => getRoom(slug);

  const { data: room, error, isLoading } = useSWR("/api/room", fetchRoom);

  if (error) throw new Error("Cannot fetch data");
  if (typeof room === "undefined" && !isLoading)
    throw new Error("Cannot fetch data");

  if (!room) return <LoadingSpinner />;

  return (
    <div>
      <HotelPhotoGallery photos={room.images} />

      <div className="container mx-auto mt-20">
        <div className="md:grid md:grid-cols-12 gap-10 px-3">
          <div className="md:col-span-8 md:w-full">
            <div>
              <h2 className="font-bold text-left text-lg md:text-2xl">
                {room.name} ({room.dimension})
              </h2>
              <div className="flex my-11">
                {room.offeredAmenities?.map((amenity) => (
                  <div
                    key={amenity._key}
                    className="md:w-44 w-fit text-center px-2 
              md:px-0 h-20 md:h-40 mr-3 bg-[#eff0f2] dark:bg-gray-800 rounded-lg
              grid place-content-center"
                  >
                    <i className={`fa-solid ${amenity.icon} md:text-2xl`}></i>
                    <p className="text-xs md:text-base pt-3">
                      {amenity.amenity}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mb-11">
                <h2 className="font-bold text-3xl mb-2">Description</h2>
                <p>{room.description}</p>
              </div>
              <div className="mb-11">
                <h2 className="font-bold text-3xl mb-2">Offered Amenities</h2>
                <div className="grid grid-cols-2">
                  {room.offeredAmenities?.map((amenity) => (
                    <div
                      key={amenity._key}
                      className="flex items-center md:my-0 my-1"
                    >
                      <i className={`fa-solid ${amenity.icon} md:text-2xl`}></i>
                      <p className="text-xs md:text-base pt-3 ml-2">
                        {amenity.amenity}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="font-bold text-3xl mb-2">
                <h2>Safety And Hygiene</h2>
                <div className="grid grid-cols-2">
                  <div className="flex items-center my-1 md:my-0">
                    <MdOutlineCleaningServices />
                    <p className="ml-2 md:text-base text-xs">Daily Cleaning</p>
                  </div>
                  <div className="flex items-center my-1 md:my-0">
                    <MdOutlineCleaningServices />
                    <p className="ml-2 md:text-base text-xs">Daily Cleaning</p>
                  </div>
                  <div className="flex items-center my-1 md:my-0">
                    <MdOutlineCleaningServices />
                    <p className="ml-2 md:text-base text-xs">Daily Cleaning</p>
                  </div>
                  <div className="flex items-center my-1 md:my-0">
                    <MdOutlineCleaningServices />
                    <p className="ml-2 md:text-base text-xs">Daily Cleaning</p>
                  </div>
                </div>
              </div>
              <div className="shadow dark:shadow-white rounded-lg p-6">
                  <div className="items-center mb-4">
                    <p className="md:text-lg font-semibold">Customer Reviews</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                  </div>
                </div>
            </div>
          </div>

          <div
            className="md:col-span-4 rounded-xl shadow-lg dark:shadow dark:shadow-wite 
        sticky top-10 h-fit overflow-auto"
          ></div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
