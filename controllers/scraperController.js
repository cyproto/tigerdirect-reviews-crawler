const scraper = require("../utils/scraper");

const scraperController = async (url) => {
  return prepareScrapedData(await scraper(url));
};

const prepareScrapedData = (data) => {
  let reviews = [];
  data.forEach((batch) => {
    batch("#customerReviews > .review").each((res, ele) => {
      reviews.push({
        title: batch(ele).find(".review > .rightCol > blockquote > h6").text(),
        comment: batch(ele).find(".review > .rightCol > blockquote > p").text(),
        rating: batch(ele)
          .find(".review > .leftCol > .itemReview > dd > .itemRating > strong")
          .text(),
        date: batch(ele)
          .find(".review > .leftCol > .reviewer > dd")
          .first()
          .next()
          .next()
          .text(),
        name: batch(ele)
          .find(".review > .leftCol > .reviewer > dd")
          .first()
          .text(),
      });
    });
  });
  return reviews;
};

module.exports = scraperController;
