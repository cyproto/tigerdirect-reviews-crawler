const cheerio = require("cheerio");
const axios = require("axios");

const scraper = async (url) => {
  let reviewsDom = [await scrapeData(url)];
  let totalRecords = reviewsDom[0](
    "#customerReviews > .reviewsPagination > .reviewPage > dt"
  );

  totalRecords = totalRecords
    .text()
    .substring(
      totalRecords.text().lastIndexOf("�") + 1,
      totalRecords.text().length
    );

  if (totalRecords > 1000) {
    const batches = parseInt(totalRecords / 1000);
    for (let pageNo = 1; pageNo < batches; pageNo++) {
      reviewsDom.push(await scrapeData(url + "pagenumber=" + i));
    }
  }

  return reviewsDom;
};

const scrapeData = async (url) => {
  const response = await axios.get(url + "&recordsPerPage=1000");
  return cheerio.load(response.data);
};

module.exports = scraper;
