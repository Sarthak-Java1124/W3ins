import { title } from "process"

type cardProps = {
    imgSrc : string
    title : string 
    date : string
    description : string
    hashtag : string
    handleShowModal : ()=>void
}

export default function CardComponent({imgSrc , title , date , description , handleShowModal , hashtag} : cardProps){
    return (
      <div
        className="h-127 w-122  bg-amber-50 mb-10 p-3 rounded-xl"
        onClick={handleShowModal}
      >
        <div className=" mx-3 ">
          <img className="h-75 rounded-sm " src={imgSrc} />
        </div>
        <div className="flex flex-col">
          <p className="font-bold ml-2 text-2xl mt-2">{title.toUpperCase()}</p>
          <p className="font-semibold ml-2 text-lg ">{description}</p>
          <p className="font-semibold ml-2 text-lg">{date}</p>
          <p className="font-semibold ml-2 text-lg">{hashtag}</p>
        </div>
      </div>
    );
}