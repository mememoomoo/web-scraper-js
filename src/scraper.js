const axios = require('axios');
const cheerio = require('cheerio');

module.exports = async function scrape(url) {
  const { data: html } = await axios.get(url);
  const $ = cheerio.load(html);
  const results = [];

  // Helper to check if an element is inside a header or footer
  function isInHeaderOrFooter(element) {
    return $(element).parents('header,footer').length > 0 || $(element).is('header,footer');
  }

  // Recursive function to traverse only divs and collect tag + text
  function traverseDiv(element) {
    $(element).contents().each((_, child) => {
      // Skip if this element or any parent is a header/footer
      if (isInHeaderOrFooter(child)) return;

      if (child.type === 'tag' && child.tagName === 'div') {
        traverseDiv(child);
      } else if (child.type === 'tag') {
        traverseOther(child, child.tagName);
      } else if (child.type === 'text') {
        const text = $(child).text().trim();
        if (text) {
          results.push({
            tag: 'div',
            content: text
          });
        }
      }
    });
  }

  // Helper to traverse non-div tags for text
  function traverseOther(element, tagName) {
    $(element).contents().each((_, child) => {
      if (isInHeaderOrFooter(child)) return;

      if (child.type === 'tag') {
        traverseOther(child, child.tagName);
      } else if (child.type === 'text') {
        const text = $(child).text().trim();
        if (text) {
          results.push({
            tag: tagName,
            content: text
          });
        }
      }
    });
  }

  // Start from body, skipping header/footer
  $('body').children().each((_, el) => {
    if (isInHeaderOrFooter(el)) return;
    if (el.tagName === 'div') {
      traverseDiv(el);
    }
  });

  return results;
};
