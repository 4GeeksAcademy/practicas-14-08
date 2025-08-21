import { useEffect, useState } from "react"
import { getAuthors } from "../../service/service.api"


export const AuthorsList = () => {

    const [showAuthors, setShowAuthors] = useState({})


    const authorsExtract = async () => {
        const data = await getAuthors()
        setShowAuthors(data)
        
    }


    useEffect(()=>{
        authorsExtract()
    },[])

    

  return (
    <>
    
    </>
  )
}
