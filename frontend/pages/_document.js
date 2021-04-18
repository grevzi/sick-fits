import Document, {Head, Html, Main, NextScript} from "next/document";
import {ServerStyleSheet} from 'styled-components'

export default class AppDocument extends Document {
    static getInitialProps({ renderPage}) {
        const sheet = new ServerStyleSheet()
        const page = renderPage(App => props => sheet.collectStyles(<App {...props} />))
        const styleTags = sheet.getStyleTags()

        return {...page, styleTags}
    }
    render() {
        return (
            <Html lang="ru-UA">
                <Head></Head>
                <body>
                    <Main/>
                    <NextScript/>
                </body>
            </Html>
        )
    }
}