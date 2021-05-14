import Page from "../components/Page";
import Router from 'next/router'
import {ApolloProvider} from "@apollo/client";
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import '../components/styles/nprogress.css'
import withData from "../lib/withData";
import CartStateProvider from "../lib/CartStateProvider";

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

const App = ({Component, pageProps, apollo}) => {
    return (
        <ApolloProvider client={apollo}>
            <CartStateProvider>
                <Page>
                    <Component {...pageProps}/>
                </Page>
            </CartStateProvider>
        </ApolloProvider>
    );
};

App.getInitialProps = async ({Component, ctx}) => {
    let pageProps = {}
    if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx)
    }
    pageProps.query = ctx.query

    return {pageProps}
}

export default withData(App);