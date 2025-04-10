export default function robots() {
    return {
      rules: {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin','/account','/components','/hooks','/style','/utils'],
      },
      sitemap: 'https://www.vegacartgo.com/sitemap.xml',
    }
  }