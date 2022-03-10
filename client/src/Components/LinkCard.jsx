import React from 'react';

const LinkCard = ({link}) => {
    return (
        <div className="row">
            <div className="col s12">
                <div className="card blue-grey darken-4">
                    <div className="card-content white-text">
                        <span className="card-title">Link</span>
                        <p>Your link: <a href={link.to} target="_blank"  rel="noreferrer">{link.to}</a></p>
                        <p>From: <a href={link.from} target="_blank" rel="noopener noreferrer">{link.from}</a></p>
                        <p>Link clicks count: <strong>{link.clicks}</strong></p>
                        <p>Creation date: <strong>{new Date(link.date).toLocaleDateString()}</strong></p>
                    </div>
                </div>  
            </div>
        </div>
    );
};

export default LinkCard;