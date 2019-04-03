import Link from "next/link";
import UpdateItem from '../components/UpdateItem';

const Update = props => (
    <div>
        <UpdateItem id={ props.query.id}/> 
        {
            //query value comes from Pageprops.query in _app.js
        }
    </div>
);

//could also use withRouter(Component)
export default Update;