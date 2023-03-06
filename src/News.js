import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";



export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 9,
    category:'general',
  }
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category:PropTypes.string,
    }
    
      constructor(props) {
        super(props);
        this.state = {
          articles: [],
          page:1,
          loading: false,
          totalResults:0
        };
        document.title = `NewsRaptor - ${this.props.category}`;
      }
  async componentDidMount(){
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1477928700d94fdcad93391e03daa44c&page=1&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data = await fetch(url);  
    let parsedData = await data.json();
    this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults,loading: false});
    this.props.setProgress(100);

  }

  handlePreviousClick = async ()=>{
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1477928700d94fdcad93391e03daa44c&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data = await fetch(url);  
    let parsedData = await data.json()
    this.setState({articles: parsedData.articles,page: this.state.page - 1,loading: false})

  }
  handleNextClick = async ()=>{
    if(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)){

    }else{
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1477928700d94fdcad93391e03daa44c&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data = await fetch(url);  
    let parsedData = await data.json()
    this.setState({articles: parsedData.articles,page: this.state.page + 1,loading: false})
    }

}
fetchMoreData = async () => {
  this.setState({page:this.state.page + 1})
  const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1477928700d94fdcad93391e03daa44c&page=${++this.state.page}&pageSize=${this.props.pageSize}`;
  let data = await fetch(url);  
  let parsedData = await data.json()
  this.setState({articles: this.state.articles.concat(parsedData.articles),
     totalResults: parsedData.totalResults,
     
     })

    };

  render() {
    return (
      <>
        <h1 className="text-center" style={{marginTop: '90px'}}>NewsRaptor - Top {this.props.category} Headlines</h1>
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner></Spinner>}
        >
       {/* {this.state.loading && <Spinner />} !this.state.loading &&-earlier used for loading  */}
       <div className="container">
        <div className="row">
          {this.state.articles.map((element,index) => {
           return <div className="col-md-4" key={index}>
              <NewsItem
                title={element.title}
                description={element.description?element.description.slice(0,100):""}
                imageUrl={element.urlToImage}
                newsUrl={element.url}
                author={element.author}
                date={element.publishedAt}
                source={element.source.name}
              />
            </div>;
          })}
        </div>
        </div>
          </InfiniteScroll>
       {/* <div className="container d-flex justify-content-end">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark mx-1" onClick={this.handlePreviousClick}> &larr; previous</button>
        <button disabled={this.state.page>=Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>next &rarr;</button>
        </div>    */}
      </>
    )
  }
}

export default News;

// i am parent
