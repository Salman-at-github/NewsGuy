import React, { Component } from 'react'
import Loading from './Loading';
import Newsitem from './Newsitem'
import propTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';


export default class Newsbox extends Component {

  static defaultProps = {
    pageSize: 9,
    country: 'in',
    category: 'general'
  }
  static propTypes = {
    country: propTypes.string,
    pageSize: propTypes.number,
    category: propTypes.string
  }
  toCapitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0

    }
    document.title = `NewsGuy - ${this.toCapitalize(this.props.category)}`;
  }

  async componentDidMount() {
    this.updateNews()
  }
  async updateNews() {
    this.props.setProgress(0);
    let site = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.api}&page=${this.state.page}&pageSize=${this.props.pageSize}
    `;
    this.setState({ loading: true });
    let data = await fetch(site);
    this.props.setProgress(40);

    let parsedData = await data.json();
    this.props.setProgress(80);

    this.setState({
      loading: false,
      articles: parsedData.articles,
      totalResults: parsedData.totalResults
    });
    this.props.setProgress(100);
  }

  // handleNextclick = async () => {
  //   this.setState({ page: this.state.page + 1 });
  //   this.updateNews()
  // }

  // handlePrevclick = async () => {
  //   this.setState({ page: this.state.page - 1 });
  //   this.updateNews()

  // }
  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    let site = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.api}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}
    `;
    let data = await fetch(site);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults
    })

  }
  render() {
    return (
      <div className=' container my-3'>
        <h2 className='text-center'>NewsGuy - Top {this.toCapitalize(this.props.category)} Headlines</h2>
        {/* && stands for true  */}
        {this.state.loading && <Loading />}
        <div className='container'>
          <InfiniteScroll style={{ overflow: 'hidden' }}
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={this.state.articles.length !== this.state.totalResults}
            loader={<Loading />}>
            <div className='row'>
              {/* this.state.articles.map is for iteration on articles  */}
              {this.state.articles.map((element, index) => {
                return <div key={index} className='col-md-4'>
                  <Newsitem author={element.author ? element.author : "Unkown"} time={element.publishedAt ? element.publishedAt : "00:00"} source={element.source.name} title={element.title ? element.title.slice(0, 50) : ""} description={element.description ? element.description.slice(0, 80) : ""} imageUrl={element.urlToImage ? element.urlToImage : `https://media.istockphoto.com/id/1182477852/photo/breaking-news-world-news-with-map-backgorund.jpg?s=612x612&w=0&k=20&c=SQfmzF39HZJ_AqFGosVGKT9iGOdtS7ddhfj0EUl0Tkc=`} newsUrl={element.url} />
                </div>
              })}
            </div>
          </InfiniteScroll>
        </div>
        {/* 
        <div className='container d-flex justify-content-between'>
          <button type="button" disabled={this.state.page <= 1} className="btn btn-primary" onClick={this.handlePrevclick}> &larr; Previous</button>
          <button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} className="btn btn-primary" onClick={this.handleNextclick}>&rarr;	Next</button>
        </div> */}
      </div>
    )
  }
}
