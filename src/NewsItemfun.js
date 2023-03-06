import React from 'react'

const NewsItemfun = (props) => {

  
    let {title, description, imageUrl,newsUrl,author,date,source} = props;
    return (
      <div className='my-3'>
        <div className="card">
          <div style={{display:'flex',
                      justifyContent:'flex-end',
                      position:'absolute',
                      right:'0'
                      }}>
        <span className="badge rounded-pill bg-danger">{source}</span>
        </div>
    
  
  <img src={imageUrl?imageUrl:"https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg"} className="card-img-top" alt="Damn" />
  <div className="card-body">
    <h5 className="card-title">{title}...</h5>
    <p className="card-text">{description}...</p>
    <p className="card-text"><small className="text-muted">By {author?author:"Unknown"} on {new Date(date).toGMTString()}</small></p>
    <a href={newsUrl} target="_blank" rel='noreferrer' className="btn btn-sm btn-dark ">Read More</a>
  </div>
</div>
      </div>
    )
  }


export default NewsItem
