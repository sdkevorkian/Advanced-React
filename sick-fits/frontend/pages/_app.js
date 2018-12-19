import App, {Container} from 'next/app';
import Page from '../components/Page';
import {ApolloProvider} from 'react-apollo';
import withData from '../lib/withData';

class MyApp extends App {
    static async getInitialProps({Component, ctx}){
        //nextJS lifecycle method
        let pageProps = {};
        //crawls pages, fetches data and returns data, used for server side applications
        //comes from next.js & apollo docs examples
        if(Component.getInitialProps){
            pageProps = await Component.getInitialProps(ctx);
        }
        //this exposes the query to the user
        pageProps.query = ctx.query;
        return {pageProps};
    }
    render(){
        const {Component, apollo, pageProps} = this.props;
        //this is the component that holds each page
        return (
            <Container>
                <ApolloProvider client={apollo}>
                    <Page>
                        <Component {...pageProps}/>
                    </Page>
                </ApolloProvider>
            </Container>
        )
    }
}

//make client accessable with this.props.
export default withData(MyApp);