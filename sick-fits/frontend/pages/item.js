import Link from 'next/link';
//link will create links between pages without causing a full refresh
//uses HTML5 push state
import SingleItem from '../components/SingleItem';

const Item = props => (
    <div>
        <SingleItem id={props.query.id}></SingleItem>
    </div>
);

export default Item;