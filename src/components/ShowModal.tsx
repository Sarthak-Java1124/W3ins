import { title } from "process";

type cardProps = {
  imgSrc: string;
  title: string;
  date: string;
  description: string;
  handleShowModal : ()=>void
};

export default function Modal({
  imgSrc,
  title,
  date,
  description,
  handleShowModal
}: cardProps ) {
  return (
    <div className="w-full h-screen min-h-screen absolute top-0 backdrop-filter backdrop-blur-lg backdrop-brightness-75" onClick={handleShowModal}>
      <div className="h-118 w-90  bg-amber-50 mb-10 p-3 rounded-xl">
        <div className=" mx-3 ">
          <img className="h-70 " src={imgSrc} />
        </div>
        <div className="flex flex-col">
          <p className="font-bold ml-2 text-2xl mt-2">{title.toUpperCase()}</p>
          <p className="font-semibold ml-2 text-lg ">{description}</p>
          <p className="font-semibold ml-2 text-lg">{date}</p>
        </div>
      </div>
    </div>
  );
}
