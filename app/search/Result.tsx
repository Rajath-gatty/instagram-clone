import Image from "next/image"
import Link from "next/link"
import {RxCross1} from "react-icons/rx"

interface SearchResultProps {
  id: string,
  name: string,
  imageUrl: string
}

const SearchResult = ({id,name,imageUrl}:SearchResultProps) => {
  return (
    <Link href={`/users/${id}`} className="flex justify-between items-center p-4 cursor-pointer">
        <div className="flex gap-4">
            <Image src={imageUrl} className="rounded-full w-[50px] h-[50px] object-cover ring ring-pink-700 ring-offset-2 ring-offset-gray-950" width={45} height={45} alt="Profile"/>
            <div>
                <p className="text-white">{name}</p>
                <p className="text-slate-500">{name.toUpperCase()}</p>
            </div>
        </div>
        <RxCross1 className="text-slate-500" size={20}/>
    </Link>
  )
}

export default SearchResult