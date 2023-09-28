import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
  };
  static propsTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
    };
    document.title = `News Monkey-${this.props.category}`;
  }
  async updateNews() {
    this.props.setProgress(0);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f0b62798c230429186056ea46d2cd3e4&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let pastData = await data.json();
    this.props.setProgress(50);
    this.setState({
      articles: pastData.articles,
      totalResults: pastData.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
  }
  async componentDidMount() {
    this.updateNews();
  }

  concitnate = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f0b62798c230429186056ea46d2cd3e4&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let pastData = await data.json();
    this.setState({
      articles: this.state.articles.concat(pastData.articles),
      totalResults: pastData.totalResults,
      loading: false,
    });
  };

  handleNext = async () => {
    this.setState({ page: this.state.page + 1 });
    this.updateNews();
  };

  fetchMoreData = () => {
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
    this.setState({ page: this.state.page + 1 });
    this.concitnate();
  };
  handlePrevious = async () => {
    this.setState({ page: this.state.page - 1 });
    this.updateNews();
  };

  render() {
    return (
      <>
        <h1 className="text-center">
          News- Top Headlines on {this.props.category}
        </h1>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles ? this.state.articles.length : 0} // Check if articles is defined
          next={this.fetchMoreData}
          hasMore={
            this.state.articles &&
            this.state.articles.length < this.state.totalResults
          } // Check if articles is defined
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {this.state.articles && this.state.articles.length > 0 ? (
                this.state.articles.map((element, index) => (
                  <div className="col-md-3" key={`${element.url}_${index}`}>
                    <NewsItem
                      title={element.title ? element.title.slice(0, 25) : ""}
                      description={
                        element.description
                          ? element.description.slice(0, 45)
                          : ""
                      }
                      imageUrl={
                        element.urlToImage || "URL_TO_YOUR_PLACEHOLDER_IMAGE"
                      }
                      newsUrl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                    />
                  </div>
                ))
              ) : (
                <div className="col-md-12 text-center">
                  <p>No articles found.</p>
                </div>
              )}
            </div>
          </div>
        </InfiniteScroll>
      </>
    );
  }
}

export default News;
