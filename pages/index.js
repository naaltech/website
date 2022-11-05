import Head from 'next/head';
import { withTranslation, i18n } from '../i18n'
import styles from '../styles/Home.module.css';

function Home({ t }) {
	return (
		<div className={styles.container}>
			<Head>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
				<title>naaltech</title>
				<meta name="description" content="Nevzat Ayaz Anadolu Lisesi Teknoloji Atölyesi" />
				<link rel="icon" href="/favicon.ico" />
				<meta name="theme-color" content="#ffffff" />
				<meta property="og:type" content="website" />
				<meta name="og:title" property="og:title" content="naaltech" />
				<meta name="og:description" property="og:description" content="Nevzat Ayaz Anadolu Lisesi Teknoloji Atölyesi" />
				<meta property="og:url" content="https://naaltech.club/" />
				<link rel="icon" type="image/png" href="/favicon.ico" />
				<link rel="apple-touch-icon" href="/favicon.ico" />
				<script async src="https://www.googletagmanager.com/gtag/js?id=G-0SWZVHH3H7"></script>
				<meta property="og:image" content="https://naaltech.club/logo.png" />
				<link rel="canonical" href="https://naaltech.club/" />
			</Head>
			<div className={styles.header}>
				<h1 className={styles.title}>naaltech!</h1>
				<h2 className={styles.slogan}>Nevzat Ayaz Anadolu Lisesi Teknoloji Atölyesi</h2>
			</div>
			<main className={styles.main}>
				<article className={styles.description}>
					<p>
						<b>Biz kimiz?</b>
					</p>
					<p>
						Naaltech, 2022 yılında Nevzat Ayaz Anadolu Lisesi'nde öğrenciler tarafından okul içerisinde yazılım, robotik ve siber güvenlik alanlarında faaliyetler düzenlemek için kurulmuş bir kulüptür. Kulüp resmi olarak Nevzat Ayaz Anadolu Lisesi altında çalışmaktadır, ayrıca dünya üzerindeki teknoloji kulüplerini destekleyen "The Hack Foundation"a üyedir.
					</p>
					<p>
						Temel olarak üyelerimize takım çalışmasını göstermek ve fikirlerinde yardımcı olmayı ve yıl içinde Türkiye içerisinde yapılan çeşitli yarışmalara katılıp okulumuzu temsil etmeyi amaçlıyoruz.
					</p>
					<p>
						Eğer ilgini çektiysek... 
						<a href="https://forms.gle/JDP6BHjTtyQGHvPc8" target="_blank" rel="noopener">
							<b> bize katıl!</b>
						</a>
					</p>
				</article>
			</main>
			<div className={styles.extra}>
				<div className={styles.links}>
					<h3>Daha fazlası için</h3>
					<ul className={styles.list}>
						<li>
							<a href="https://www.instagram.com/naaltech/" target="_blank" rel="noopener">
								<b>
									<u>Instagram</u>
								</b>
							</a>
						</li>
                                                <li>
							<a href="https://twitter.com/naalteknoloji" target="_blank" rel="noopener">
								<b>
									<u>Twitter</u>
								</b>
							</a>
						</li>
						<li>
							<a href="https://github.com/naaltech" target="_blank" rel="noopener">
								<b>
									<u>Github</u>
								</b>
							</a>
						</li>
                                                <li>
							<a href="https://www.linkedin.com/company/naaltech/" target="_blank" rel="noopener">
								<b>
									<u>LinkedIn</u>
								</b>
							</a>
						</li>

					</ul>
				</div>
				<div className={styles.links}>
					<h3>İletişim</h3>
					<ul className={styles.list}>
						<li>
							<a href="https://nevzatayazal.meb.k12.tr/" target="_blank" rel="noopener">
								<b>
									<u>Nevzat Ayaz Anadolu Lisesi</u>
								</b>
							</a>
						</li>
						<li>
							<a href="https://forms.gle/JDP6BHjTtyQGHvPc8" target="_blank" rel="noopener">
								<b>
									<u>Başvuru formu</u>
								</b>
							</a>
						</li>
						<li>
							<a href="https://discord.gg/wT4PYqpXpN" target="_blank" rel="noopener">
								<b>
									<u>Discord</u>
								</b>
							</a>
						</li>
						<li>
							<a href="https://wa.me/19093754470" target="_blank" rel="noopener">
								<b>
									<u>Whatsapp</u>
								</b>
							</a>
						</li>
					</ul>
				</div>
			</div>
			<div className={styles.sponsors}>
				<h3>Sponsorlar</h3>
				<ul className={styles.list}>
					<li>
						<a href="https://vercel.com" target="_blank" rel="noopener">
							<picture>
								<source srcSet="/sponsors/vercel-light.svg" media="(prefers-color-scheme: dark)" />
								<img alt="Vercel Logo" src="/sponsors/vercel-dark.svg" />
							</picture>
						</a>
					</li>
					<li>
						<a href="https://hackclub.com" target="_blank" rel="noopener">
							<picture>
							<source srcSet="/sponsors/hackclub.png" media="(prefers-color-scheme: dark)" />
								<img alt="Hackclub Logo" src="/sponsors/hackclub.png" width="230" height="64"/>
							</picture>
						</a>
					</li>
				</ul>
			</div>
		</div>
	);
}

Home.getInitialProps = async () => ({
	namespacesRequired: ['common'],
})

export default withTranslation('common')(Home)
