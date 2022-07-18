import axios from 'axios'
import cheerio from 'cheerio'

export const startCrawling = async (prefer) => {
  const favoritesite = await axios.get(prefer)
  const siteog = {}
  const $ = cheerio.load(favoritesite.data)
  $('meta').each((_, el) => {
    if ($(el).attr("property")?.includes("og:")){
      const key = $(el).attr("property") 
      const value = $(el).attr("content")

      siteog[key.split("og:")[1]] = value
    }
  })
  
  return siteog
}