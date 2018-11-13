import Link from 'next/link';
//link will create links between pages without causing a full refresh
//uses HTML5 push state

const Home = props => (
    <div>
        <p>Hey!</p>
        <Link href="/sell">
            <a>sell</a>
        </Link>
    </div>
);

export default Home;