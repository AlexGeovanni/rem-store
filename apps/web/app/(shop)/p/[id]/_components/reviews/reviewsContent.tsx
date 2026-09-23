
import StarRating from "./starRating";
import { TypeReview } from "../../productView";

type ReviewsContentProps = {
  rating: number;
  reviews: TypeReview[];
};

export default function ReviewsContent({
  rating,
  reviews,
}: ReviewsContentProps) {
  return (
    <>
      <div>
        <h2 className="text-xl font-medium pb-5">
          Clasificación y Comentarios
        </h2>
        <div className="flex flex-col gap-4 md:flex-row">
          <div className=" min-w-[220px] lg:min-w-[345px] ">
            <div className="flex flex-col items-startgap-2 ">
              <div className="flex gap-2  text-nowrap">
                <p className="text-6xl font-semibold flex gap-1 items-center">
                  4,5 <span className="text-base  text-gray-700">/5</span>
                </p>
                <div className="text-sm md:text-base text-gray-700 mt-1">
                  <StarRating rating={rating} />
                  <span className="tracking-[-0.2px] md:text-sm lg:text-base">
                    ({reviews.length ?? 0} comentarios)
                  </span>
                </div>
              </div>
              {/* <div className="flex flex-col gap-0 w-full">
                  <div className="flex gap-1 items-center justify-start w-full ">
                    <p className="text-sm font-light text-gray-900 flex gap-1">
                      <StartIcon className="w-4 h-4 text-gray-600/40" /> 5
                    </p>
                    <div className="w-full h-[5px] bg-gray-900 rounded-full"></div>
                  </div>
                  <div className="flex gap-1 items-center justify-start w-full ">
                    <p className="text-sm font-height text-gray-900 flex gap-1">
                      <StartIcon className="w-4 h-4 text-gray-600/40" /> 4
                    </p>
                    <div className="w-full h-[5px] bg-gray-900 rounded-full"></div>
                  </div>
                  <div className="flex gap-1 items-center justify-start w-full ">
                    <p className="text-sm font-height text-gray-900 flex gap-1">
                      <StartIcon className="w-4 h-4 text-gray-600/40" /> 3
                    </p>
                    <div className="w-full h-[5px] bg-gray-900 rounded-full"></div>
                  </div>
                  <div className="flex gap-1 items-center justify-start w-full ">
                    <p className="text-sm font-height text-gray-900 flex gap-1">
                      <StartIcon className="w-4 h-4 text-gray-600/40" /> 2
                    </p>
                    <div className="w-full h-[5px] bg-gray-900 rounded-full"></div>
                  </div>
                  <div className="flex gap-1 items-center justify-start w-full ">
                    <p className="text-sm font-height text-gray-900 flex gap-1">
                      <StartIcon className="w-4 h-4 text-gray-600/40" /> 1
                    </p>
                    <div className="w-full h-[5px] bg-gray-900 rounded-full"></div>
                  </div>
                </div> */}
            </div>
          </div>

          {/* <CarouselReviews reviewsGroup={reviewsGroup} /> */}
        </div>
      </div>
    </>
  );
}
