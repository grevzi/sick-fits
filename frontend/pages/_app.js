import Page from "../components/Page";
import Router from 'next/router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const App = ({Component, pageProps}) => {
    return (
        <Page>
            <Component {...pageProps}/>
        </Page>
    );
};

export default App;