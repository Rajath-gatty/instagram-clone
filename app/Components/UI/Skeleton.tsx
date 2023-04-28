const Skeleton = ({count=1}:{count?:number}) => {
    const countArr = new Array(count).fill('');

    return (
        <>
            {countArr.map((_,i) => (
            <div key={i} className="p-2">
                <div className="w-full flex gap-4 items-center">
                    <div className="w-[45px] h-[45px] rounded-full skeleton-content bg-gray-700 "></div>
                    <div className="skeleton-content w-[200px] bg-gray-700 h-4"></div>
                </div>
                <div className="skeleton-content h-[300px]  w-full mt-4 "></div>
                <div className="skeleton-content h-4 w-1/2 mt-4 "></div>
                <div className="skeleton-content h-4 w-1/4 mt-2 mb-12 "></div>
            </div> 
            ))}
        </>
    )
  }

  export default Skeleton;