import React, {useState, useContext, useEffect, useCallback} from 'react';
import { useHttp } from './../hooks/http.hook';
import { AuthContext } from './../context/AuthContext';
import Loader from '../Components/Loader';
import LinksList from '../Components/LinksList';

const LinksPage = () => {
    const [links, setLinks] = useState([]);
    const {request, loading}=useHttp();
    const auth = useContext(AuthContext);
    
    const fetchLinks=useCallback(async () => {
        try {
            const fetched=await request('/api/link', "GET", null, {
                Authorization: `Bearer ${auth.token}`,
            })
            setLinks(fetched);
        } catch (e) {}
      },[auth, request],
    )
    
    useEffect(() => {
        fetchLinks()
    }, [fetchLinks]);

    if(loading) return (<Loader/>)

    return (
        <>
            {!loading && <LinksList links={links}/>}
        </>
    );
};

export default LinksPage;