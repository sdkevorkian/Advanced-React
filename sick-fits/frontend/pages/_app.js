import App, {Container} from 'next/app';
import Page from '../components/Page';

class MyApp extends App {
    render(){
        const {Component} = this.props;
        //this is the component that holds each page
        return (
            <Container>
                <Page>
                    <Component />
                </Page>
            </Container>
        )
    }
}



export default MyApp;