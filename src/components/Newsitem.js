import React, { Component } from 'react';

export class Newsitem extends Component {
    render() {
        let { title, description,imageUrl, newsUrl, author, time, source} = this.props;
        return (
            <div className='my-4'>
                <div className="card" style={{ width: "18rem" }}>

                    <img src={imageUrl} className="card-img-top" alt="News" />
                <span className="badge rounded-pill text-bg-warning">{source}</span>
                    <div className="card-body">
                        <h5 className="card-title">{title}..</h5>
                        <p className="card-text">{description}...</p>
                        <p className="card-text"><small className='text-muted'>By {author} on {new Date(time).toUTCString()}</small></p>
                        <a href={newsUrl} rel='noreferrer' target='_blank' className="btn btn-sm btn-dark">Read more</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default Newsitem
