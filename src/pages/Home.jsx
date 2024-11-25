import Navbar from "../components/navbar";

function Home() {
  return (
    <>
      <Navbar />

      <div class="max-w-5xl mx-auto mt-12 px-4 text-center">
        <div class="w-full max-w-3xl mx-auto">
          <h1 class="text-4xl font-bold mt-2 mb-6">
            Helping you find your new home;
            <br />
            by simplifying the search.
          </h1>
          <p class="px-4 leading-relaxed">
            Propiti provides you with a quick, simple way to reach multiple
            estate agents.
            <br />
            Allowing you to spend less time trawling through property portals,
            <br />
            giving you more time on the other things you enjoy.
          </p>
          <p class="mb-8 mt-4 px-4 leading-relaxed">
            Oh, and the best bit...
            <span class="text-pink-600 font-bold">It's free!</span>
          </p>
          <div>
            <a
              class="inline-block py-4 px-8 leading-none text-white bg-slate-800 hover:bg-pink-600 rounded shadow text-sm font-bold"
              href="/bits"
            >
              See Running Bits
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
export default Home;
