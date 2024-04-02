const Hero = () => {
  return (
    <header className="w-full flex justify-center items-center flex-col">
        <nav className='flex justify-between items-center w-full mb-10 mt-10'>
            <h6 className="text-3xl font-bold">
                <span className="violet_gradient">Summarize.AI</span>
            </h6>

            <button 
                type='button'
                onClick={() => window.open("https://github.com/supremekhadka/ai-summarizer")}
                className='relative inline-block px-5 py-2 font-medium group'
            >
                <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
                <span className="relative text-black group-hover:text-white">Github</span>
            </button>
        </nav>

        <h1 className="head_text">
            <span className="violet_gradient">Summarize.AI</span>
        </h1>
        <h2 className="desc">
            Say goodbye to lengthy articles, documents, or reports – our AI Summarizer condenses vast amounts of information into concise, digestible summaries in a matter of seconds.
        </h2>
    </header>
  )
}

export default Hero;