import { createContext } from "react";

export const FetchContext = createContext();

export const FetchContextState = ({children})=>{
    const [loading,setLoading] = useState(false)
    const [songs,setSongs] = useState(null)
    const [playlists,setPlaylists] = useState(null)
    
    return(
        <FetchContext.Provider value={{}}>
            
        </FetchContext.Provider>
    )
}