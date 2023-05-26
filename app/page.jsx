import Feed  from '@components/Feed';


const home = () => {
return (
    <section className="w-full flex-center flex-col">
        <h1 className="head_text text-center">
            Discover & share. 
            <br className='max-md:hidden' />
            <span className="orange_gradient text-center">AI-powered prompts</span>
        </h1>
        <p className="desc text-center ">
        Unlock your creativity with Promptify - <br /> The open source AI tool for generating fresh ideas.
        </p>

        <Feed />
    </section>
)
}

export default home
