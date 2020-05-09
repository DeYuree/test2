import colors from 'vuetify/es5/util/colors'

import * as firebase from 'firebase'

const firebaseConfig = {
//   apiKey: process.env.VUE_APP_API_KEY,
//   authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
//   databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL,
//   projectId: process.env.VUE_APP_FIREBASE_PROGECT_ID,
//   storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCHKET,
//   messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGE_SENDER_ID,
//   appId: process.env.VUE_APP_FIREBASE_APP_ID,
//   measurementId: process.env.VUE_APP_FIREBASE_MEASUREMENT_ID,

  apiKey: 'AIzaSyDvQOQaDM_-47YzFKIa3CFO_8PFBpUgDBw',
  authDomain: 'gylki1.firebaseapp.com',
  databaseURL: 'https://gylki1.firebaseio.com',
  projectId: 'gylki1',
  storageBucket: 'gylki1.appspot.com',
  messagingSenderId: '415366107188',
  appId: "1:415366107188:web:2611beec5d2127ebe03a61",
  measurementId: 'G-219LR76DPK'
}

let app = null
if (!firebase.apps.length) {
  app = firebase.initializeApp(firebaseConfig)
}

const firebaseDB = firebase.firestore()

require('dotenv').config()

// import purgecss from '@fullhuman/postcss-purgecss'
const imageminMozjpeg = require('imagemin-mozjpeg')
// const JavaScriptObfuscator = require('webpack-obfuscator')
const ImageminPlugin = require('imagemin-webpack-plugin').default

const isDev = process.env.NODE_ENV !== 'production'


export default {
	mode: 'universal',

	...(!isDev && {
		modern: 'client'
	}),

	/*
	** Headers of the page
	*/
	head: {
		htmlAttrs: {
			lang: 'ru'
		},
		// titleTemplate: '%s - ' + process.env.npm_package_name,
		// title: process.env.npm_package_name || '',
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
		],
		link: [
			{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
		]
	},
	/*
	** Customize the progress-bar color
	*/
	loading: '~/components/page/Loading.vue',

	rootDir: __dirname,

	router: {
		prefetchLinks: false,
		base: '/deyuree.github.io/'
	},

	// custom styles in components
	styleResources: {
		sass: [
			'assets/sass/base.sass',
		]
	},
	/*
	** Global CSS
	*/
	css: [
		'normalize.css',
		'@fortawesome/fontawesome-free/css/all.css',
		'swiper/dist/css/swiper.css'
	],
	/*
	** Plugins to load before mounting the App
	*/
	plugins: [
		'~/plugins/firebase.js',
		{ src: '~/plugins/swiper.js', ssr: false },
		{ src: '~/plugins/localStorage.js', ssr: false },
	],
	/*
	** Nuxt.js dev-modules
	*/
	buildModules: [
		'@nuxtjs/vuetify',
	],
	/*
	** Nuxt.js modules
	*/
	modules: [
		'@nuxtjs/style-resources',
		'@nuxtjs/dotenv',
		'nuxt-trailingslash-module',
		'nuxt-webfontloader',
	],

	webfontloader: {
		events: false,
		google: {
			families: ['Montserrat:400,500,600:cyrillic&display=swap']
		},
		timeout: 5000
	},

	/*
	** vuetify module configuration
	** https://github.com/nuxt-community/vuetify-module
	*/
	vuetify: {
		//customVariables: ['~/assets/variables.scss'],
		defaultAssets: false,
		theme: {
			dark: false,
			icons: {
				iconfont: 'fa'
			},
			themes: {
				dark: {
					primary: colors.blue.darken2,
					accent: colors.grey.darken3,
					secondary: colors.amber.darken3,
					info: colors.teal.lighten1,
					warning: colors.amber.base,
					error: colors.deepOrange.accent4,
					success: colors.green.accent3
				}
			}
		}
	},

	/*
	** Build configuration
	*/
	build: {
		optimizeCss: false,
		filenames: {
			app: ({ isDev }) => isDev ? '[name].js' : 'js/[contenthash].js',
			chunk: ({ isDev }) => isDev ? '[name].js' : 'js/[contenthash].js',
			css: ({ isDev }) => isDev ? '[name].css' : 'css/[contenthash].css',
			img: ({ isDev }) => isDev ? '[path][name].[ext]' : 'img/[contenthash:7].[ext]',
			font: ({ isDev }) => isDev ? '[path][name].[ext]' : 'fonts/[contenthash:7].[ext]',
			video: ({ isDev }) => isDev ? '[path][name].[ext]' : 'videos/[contenthash:7].[ext]'
		},
		...(!isDev && {
			html: {
				minify: {
					collapseBooleanAttributes: true,
					decodeEntities: true,
					minifyCSS: true,
					minifyJS: true,
					processConditionalComments: true,
					removeEmptyAttributes: true,
					removeRedundantAttributes: true,
					trimCustomFragments: true,
					useShortDoctype: true
				}
			}
		}),
		splitChunks: {
			layouts: true,
			pages: true,
			commons: true
		},
		optimization: {
			minimize: !isDev
		},
		...(!isDev && {
			extractCSS: {
				ignoreOrder: true
			}
		}),

		transpile: ['vue-lazy-hydration', 'intersection-observer'],
		postcss: {
			plugins: {
				...(!isDev && {
					cssnano: {
						preset: ['advanced', {
							autoprefixer: false,
							cssDeclarationSorter: false,
							zindex: false,
							discardComments: {
								removeAll: true
							}
						}]
					}
				})
			},
			...(!isDev && {
				preset: {
					browsers: 'cover 99.5%',
					autoprefixer: true
				}
			}),

			order: 'cssnanoLast'
		},
		extend(config, ctx) {
			const ORIGINAL_TEST = '/\\.(png|jpe?g|gif|svg|webp)$/i'

			// Remove any original svg rules

			const vueSvgLoader = [
				{
					loader: 'vue-svg-loader',
					options: {
						svgo: false
					}
				}
			]
			const imageMinPlugin = new ImageminPlugin({
				pngquant: {
					quality: '5-30',
					speed: 7,
					strip: true
				},
				jpegtran: {
					progressive: true

				},
				gifsicle: {
					interlaced: true
				},
				plugins: [
					imageminMozjpeg({
						quality: 70,
						// arithmetic: true,
						progressive: true
					})

				]
			})
			if (!ctx.isDev) config.plugins.push(imageMinPlugin)

			config.module.rules.forEach(rule => {
				if (rule.test.toString() === ORIGINAL_TEST) {
					rule.test = /\.(png|jpe?g|gif|webp)$/i
					rule.use = [
						{
							loader: 'url-loader',
							options: {
								limit: 1000,
								name: ctx.isDev ? '[path][name].[ext]' : 'img/[contenthash:7].[ext]'
							}
						}
					]
				}
			})
			//  Create the custom SVG rule
			const svgRule = {
				test: /\.svg$/,
				oneOf: [
					{
						resourceQuery: /inline/,
						use: vueSvgLoader
					},
					{
						resourceQuery: /data/,
						loader: 'url-loader'
					},
					{
						resourceQuery: /raw/,
						loader: 'raw-loader'
					},
					{
						loader: 'file-loader' // By default, always use file-loader
					}
				]
			}

			config.module.rules.push(svgRule) // Actually add the rule
		}
	},

	generate: {
		async routes() {
			let routesArr = []

			await firebaseDB.collection('categories').get().then(res => {
				res.docs.map(category => {
					routesArr.push('/catalog/' + category.data().link)
				})
			})

			await firebaseDB.collection('products').get().then(res => {
				res.docs.map(product => {
					routesArr.push('/product/' + product.data().link)
				})
			})

			return routesArr
		}
	}
}