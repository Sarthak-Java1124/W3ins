type CardProps = {
  imgSrc: string;
  title: string;
  date: string;
  description: string;
  hashtag: string;
  handleShowModal: () => void;
};

export default function CardComponent({
  imgSrc,
  title,
  date,
  description,
  handleShowModal,
  hashtag,
}: CardProps) {
  return (
    <div
      className="w-full  h-80 bg-amber-50 mb-6 p-3 rounded-xl lg:h-127 lg:w-122 "
      onClick={handleShowModal}
    >
      <div className="mx-3">
        <img
          className="w-full h-40 rounded-sm lg:h-75 object-fill"
          src={imgSrc}
          alt={title}
        />
      </div>
      <div className="flex flex-col mt-2">
        <p className="font-bold ml-2 text-xl lg:text-2xl">
          {title.toUpperCase()}
        </p>
        <p className="font-semibold ml-2 text-sm lg:text-lg">{description}</p>
        <p className="font-semibold ml-2 text-sm lg:text-lg">{date}</p>
        <p className="font-semibold ml-2 text-sm lg:text-lg">{hashtag}</p>
      </div>
    </div>
  );
}
