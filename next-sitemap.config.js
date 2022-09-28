/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: 'https://ayakkabimakineleri.com' || 'https://www.ayakkabimakineleri.com',
  generateRobotsTxt: true,
  exclude: ["/404"],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        disallow: ["/404"],
      },
      { userAgent: "*", allow: "/" },
    ],
    additionalSitemaps: [
      `https://www.ayakkabimakineleri.com/sitemap.xml`,
      `https://www.ayakkabimakineleri.com/server-sitemap.xml`,
    ],
  }
}

module.exports = config