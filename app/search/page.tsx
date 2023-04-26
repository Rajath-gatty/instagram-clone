"use client"
import { User } from "@prisma/client";
import SearchResult from "./Result";
import {useState, useEffect} from "react";

const SearchPage = () => {
  const [query,setQuery] = useState<string | null>(null);
  const [users,setUsers] = useState<User[]>([]);

  useEffect(() => {

    const fetchUsers = async () => {
     const res = await fetch('/api/searchUsers',{
        method:"POST",
        headers: {
          "content-type":"application/json"
        },
        body:JSON.stringify({query})
      })
      const result = await res.json();
      setUsers(result);
    }

    if(!query) return;
    fetchUsers();

  },[query])

  return (
    <div className="max-w-xl md:mx-auto m-4 mt-10">
        <div className="border-b border-slate-700 pb-10">
            <input onChange={(e) => setQuery(e.target.value)} type="text" className="text-white bg-gray-800 outline-none p-2 rounded w-full pl-5" placeholder="Search" />
        </div>
        <div>
          {users.length>0?users.map(user => {
            return <SearchResult 
            id={user.id} 
            key={user.id} 
            imageUrl={user.image as string} 
            name={user.name as string}  
            />
          }): <h1 className="text-center font-medium text-xl mt-16 text-white">No users found</h1>}
        </div>
    </div>
  )
}

export default SearchPage;