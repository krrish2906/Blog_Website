import {
    Header,
    Footer,
    Navbar,
    BlogList,
    NewsLetter,
} from "../components/index";

function Home() {
    return (
        <>
            <Navbar />
            <Header />
            <BlogList />
            <NewsLetter />
            <Footer />
        </>
    );
}

export default Home;
