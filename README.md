# Tigerdirect crawler/scraper

### Endpoint:

- /scrape (POST)

##### Post data format:

```
{
    "url": "tigetdirect-product-url"
}
```

##### Sample:

```
{
    "url": "https://www.tigerdirect.com/applications/searchtools/item-details.asp?EdpNo=607601"
}
```

There is a dummy auth middleware, so you need to pass a header with the following values

```
key: auth
value: qwer1234
```

##### Packages used:

- express
- cheerio (to access scraped DOM)
- axios (to send a request to given URL)

##### Key points:

- Once the product URL is passed the API will take care of pulling and preparing all the reviews.
- It will be getting the reviews in a batch of 1000 if there is a tonne of reviews on any product.
- Clustering is implemented for obvious reasons.

##### Future scope:

- Make scraping async and respond to the client once everything is scraped and prepared.
