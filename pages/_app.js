import App from 'next/app'
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
	return <Component {...pageProps} />;
}

MyApp.getInitialProps = async (appContext) => ({ ...await App.getInitialProps(appContext) })

export default MyApp;
