import { useState, useEffect } from 'react';

import { copy, linkIcon, loader, tick, submit } from '../assets';

import { useLazyGetSummaryQuery } from '../services/article'

const Demo = () => {
  const [article, setArticle] = useState({
    url: '',
    length: '5',
    summary: ''
  });

  const [allArticles, setAllArticles] = useState([]);
  const[copied, setCopied] = useState("''");

  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(localStorage.getItem('articles'))

    if(articlesFromLocalStorage) {
      setAllArticles(articlesFromLocalStorage)
    }
  }, [])


  const handleSubmit = async(e) => {
    e.preventDefault();

    const { data } = await getSummary({ articleUrl: article.url, articleLength: article.length });

    if(data?.summary){
      const newArticle = { ...article, summary: data.summary };
      const updatedAllArticles = [newArticle, ...allArticles];

      setArticle(newArticle);
      setAllArticles(updatedAllArticles);

      localStorage.setItem('articles', JSON.stringify(updatedAllArticles));
    }
  }

  const handleCopy = (copyUrl) => {
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);
    setTimeout(() => setCopied(false), 3000);
  }

  const handleLengthChange = (event) => {
    setArticle({ ...article, length: event.target.value });
  }

  return (
    <section className="mt-16 w-full max-w-2xl">
      {/* Search */}
      <div className="flex flex-col w-full gap-2">
        <form 
          onSubmit={handleSubmit}  
          className="flex flex-col justify-center items-center gap-10">
            <div className="flex length-select w-full justify-center items-center gap-5">
              <label htmlFor="length">Length:</label>
              <input 
                type="range" 
                id="length" 
                name="length" 
                min="5" 
                max="45" 
                step="20" 
                value={article.length} 
                onChange={handleLengthChange} 
                className='w-20 bg-violet-600'
                style={{backgroundImage: 'linear-gradient(to right, var(--tw-gradient-stops))', backgroundColor: '#4F46E5' }}
              />
              <span className="length-label w-14 text-end">{article.length == 5 ? 'Short' : article.length == 25 ? 'Medium' : 'Long'}</span>
            </div>
            <div className="link flex relative w-full">
              <img 
                src={linkIcon} 
                alt="Link Icon"
                className="absolute left-0 my-4 ml-3 w-5" />
                
              <input 
                type="url"
                placeholder="Enter a URL"
                value={article.url}
                onChange={(e) => setArticle({
                  ...article, url: e.target.value
                })}
                required
                className='url_input peer'
              />

                <button
                  type='submit'
                  className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700"
                >
                  <img 
                    src={submit} 
                    alt="submit_icon" 
                    className='h-5'
                  />
                </button>
            </div>
          </form>

          <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
          {allArticles.map((item, index) => (
            <div 
              key={`link-${index}`}
              onClick={() => setArticle(item)}
              className='link_card'
            >
              <div className="copy_btn" onClick={() => handleCopy(item.url)}>
                <img 
                  src={copied === item.url ? tick : copy} 
                  alt="copy_icon"
                  className="w-[40%] h-[40%] object-contain "  
                />
              </div>
              <p className='flex-1 font-roboto text-blue-700 font-medium text-sm truncate'>
                {item.url}
              </p>
            </div>
          ))}
          </div>
      </div>
      <div className="my-10 max-w-full flex justify-center items-center">
        {isFetching ? (
          <img src={loader} alt="loader" className='w-20 h-20 object-contain' />
        ) : error ? (
          <p className='font-roboto font-bold text-black text-center'> 
            An Error Occurred!
            <br />
            <span className='font-roboto font-normal text-gray-700'>
              {error?.data?.error}
            </span>
          </p>
        ) : (
          article.summary && (
            <div className="flex flex-col gap-3">
              <h2 className='font-roboto font-bold text-gray-600 text-2xl'>
                <span className='violet_gradient'>
                  Summary
                </span>
              </h2>
              <div className="summary_box">
                <p className='font-roboto font-medium text-xl text-gray-800'>
                  {article.summary}
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  )
}

export default Demo