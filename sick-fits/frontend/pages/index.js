import Link from 'next/link';
//link will create links between pages without causing a full refresh
//uses HTML5 push state
import Items from '../components/Items';

const Home = props => (
    <div>
        <Items/>
    </div>
);

export default Home;