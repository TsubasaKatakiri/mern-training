import React from 'react';
import { useState, useCallback, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from './../context/AuthContext';
import Loader from './../Components/Loader';
import LinkCard from '../Components/LinkCard';

const DetailPage = () => {
    const auth = useContext(AuthContext);
    const {request, loading}=useHttp();
    const [link, setLink] = useState(null);
    const linkId=useParams().id;

    const getLink=useCallback(async () => {
        try {
            const fetched=await request(`/api/link/${linkId}`, "GET", null, {
                Authorization: `Bearer ${auth.token}`
            })
            setLink(fetched);
        } catch (e) {}
    }, [auth, linkId, request])

    useEffect(() => {
      getLink();
    }, [getLink])
    
    if(loading){return <Loader/>}

    return (
        <>
            {!loading && link && <LinkCard link={link}/>}
        </>
    );
};

export default DetailPage;