

export default function Home() {
  return (
    <>
    <nav className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
      <a className="btn btn-ghost text-xl">Anon</a>
      </div>

      <div className="flex-none">
       <button className="btn btn-secondary">Get Started</button>
      </div>
    </nav>


      <section className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
  
          <div className="max-w-lg text-secondary">
            <h1 className="text-5xl font-bold ">Box Office News!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
              quasi. In deleniti eaque aut repudiandae et a id nisi.
            </p>
            <button className="btn btn-primary">Get Started</button>
          </div>
        </div>
      </section>
    
    
    </>
  );
}
