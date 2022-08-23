// Cronology of class based components:
// --> constructor()
// --> render()
// --> componentDidMount()

import React, { useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';
import { useEffect } from 'react';

const News = (props) => {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)

    const capitalize = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const headline = (category) => {
        if(category === "general"){
            return ""
        }
        else{
            return `- ${capitalize(category)}`
        }
    }
    
    const updatePage = async () => {
        props.setProgress(10);
        // this.setState({ page: this.state.page + 1});
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
        console.log(url, page, "updatePage");
        setPage(page+1)
        let data = await fetch(url);
        let parsedData = await data.json();
        props.setProgress(40)

        document.title = `Nyusu - ${capitalize(props.category)}`

        setArticles(parsedData.articles)
        setLoading(false)
        setTotalResults(parsedData.totalResults)
        props.setProgress(100)

    };

    const fetchMoreData = async() => {
        setLoading(true)
        // this.setState({ page: this.state.page + 1, loading: true })
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
        // console.log(url, page)
        setPage(page+1)
        let data = await fetch(url);
        let parsedData = await data.json()
        setArticles(articles.concat(parsedData.articles))
        console.log(url, articles.length)
        
        document.title = `Nyusu - ${capitalize(props.category)}`
        
        setLoading(false)
    }

    useEffect(() => {
      updatePage() // eslint-disable-next-line no-use-before-define
    }, [])
    
        return (
            <>
                <h1 className='text-center' style={{marginTop:"70px"}}>{`Top Headlines${headline(props.category)}`}</h1>
                <div className="container">
                {loading && <Spinner />}
                <InfiniteScroll 
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length + props.pageSize !== totalResults}
                    loader={<Spinner/>}>

                <div className="row">
                    {articles.map((element) => {
                        return <div className="col-md-4" key={element.url}>
                            <NewsItem title={element.title ? element.title : ""}
                                description={element.description ? element.description : ""} imageUrl={element.urlToImage}
                                newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                        </div>
                    })}
                </div>
                </InfiniteScroll>
                </div>
            </>
        )
}

News.defaultProps = {
    country: "in",
    pageSize: 12,
    category: "bussiness",
    totalResults: 0
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
    totalResults: PropTypes.number
}

export default News