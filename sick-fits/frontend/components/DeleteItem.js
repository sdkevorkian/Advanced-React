import React, { Component } from 'react';
import {Mutation} from 'react-apollo';
import {ALL_ITEMS_QUERY} from './Items';
import gql from 'graphql-tag';

const DELETE_ITEM_MUTATION = gql`
    mutation DELETE_ITEM_MUTATION($id: ID!){
        deleteItem(id: $id){
            id
        }
    }
`;

class DeleteItem extends Component {
    update = (cache, payload) =>{
        //apollo gives you access to cache or payload/data on update
        //manually update cache to match server
        //1) read cache for items we want - have to use gql query to read and write back
        // what is query used to get items on page?
        const data = cache.readQuery({query: ALL_ITEMS_QUERY});
        //2) filter deleted item out of page
        data.items = data.items.filter(item=> item.id !== payload.data.deleteItem.id);
        //3) put items back
        cache.writeQuery({query: ALL_ITEMS_QUERY, data});
    }
    render(){
        return (            
            <Mutation 
            mutation={DELETE_ITEM_MUTATION}
            variables={{id: this.props.id}}
            update={this.update}>
            {(deleteItem, {error}) =>(
                <button onClick={(e)=>{
                    if(confirm('are you sure you want to delete this?')){
                        deleteItem();
                    }
                }}>{this.props.children}</button>            

            )}
            </Mutation>
        )
    }
}

export default DeleteItem;
