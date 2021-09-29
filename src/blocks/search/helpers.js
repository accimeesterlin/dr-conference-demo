import { DateTime } from "luxon";

import { languages, countries, categories, sortByOptions } from "./contants";

export const processAdvancedOptions = (values) => {
  // const regex = new RegExp("^([a-z0-9]+(-[a-z0-9]+)*.)+[a-z]{2,}$");
  const {
    q,
    qInTitle,
    sources,
    domains,
    excludeDomains,
    language,
    sortBy,
    to,
    from,
    page,
    pageSize,
  } = values;

  const params = {};
  if (q) {
    params.q = q;
  }

  if (qInTitle) {
    params.qInTitle = qInTitle;
  }

  if (sources) {
    params.sources = sources.map((el) => el.value).join(",");
  }

  if (domains) {
    params.domains = domains; // .map((el) => el.value).join(",");
  }

  if (excludeDomains) {
    params.excludeDomains = excludeDomains; // .map((el) => el.value).join(",");
  }

  if (language && language !== "all") {
    params.language = language;
  }

  if (sortBy !== "publishedAt") {
    params.sortBy = sortBy;
  }

  if (from) {
    params.from = from.toISOString();
  }

  if (to) {
    params.to = to.toISOString();
  }

  if (pageSize) {
    params.pageSize = pageSize || 25;
  }

  params.page = page || 1;

  return params;
};

// /v2/everything
export const newsapiEverything = (values) => {
  const {
    q,
    qInTitle,
    sources,
    domains,
    excludeDomains,
    language,
    sortBy,
    to,
    from,
    page,
    pageSize,
  } = values;

  const params = {};

  if (q) {
    params.q = q;
  }

  if (qInTitle) {
    params.qInTitle = qInTitle;
  }

  if (Array.isArray(sources)) {
    params.sources = sources.join(",");
  }

  if (Array.isArray(domains)) {
    params.domains = domains.join(","); // .map((el) => el.value).join(",");
  }

  if (Array.isArray(excludeDomains)) {
    params.excludeDomains = excludeDomains.join(","); // .map((el) => el.value).join(",");
  }

  if (from) {
    params.from = from;
  }

  if (to) {
    params.to = to;
  }

  if (languages.includes(language)) {
    params.language = language;
  }

  if (sortByOptions.includes(sortBy)) {
    params.sortBy = sortBy;
  }

  if (Number.parseInt(pageSize, 10)) {
    params.pageSize = Number.parseInt(pageSize, 10);
  }

  if (Number.parseInt(page, 10)) {
    params.page = Number.parseInt(page, 10);
  }
  return params;
};

// /v2/top-headlines
export const newsapiTopHeadlines = (values) => {
  if (values.country && values.sources) {
    throw new Error("You cannot mix country and sources");
  }

  if (values.category && values.sources) {
    throw new Error("You cannot mix category and sources");
  }

  const { sources, q, category, country, page, pageSize } = values;
  const params = {
    pageSize: pageSize || 20,
    page: page || 1,
  };

  if (q) {
    params.q = q;
  }

  if (sources && sources.length > 0) {
    params.sources = sources.map((el) => el.value).join(",");
  } else {
    if (categories.includes(category)) {
      params.category = category;
    }
    if (countries.includes(country)) {
      params.country = country;
    }
  }

  return params;
};

// /v2/top-headlines/sources
export const newsapiSoures = (values) => {
  const { category, language, country } = values;
  const params = {};
  if (categories.includes(category)) {
    params.category = category;
  }

  if (languages.includes(language)) {
    params.language = language;
  }

  if (countries.includes(country)) {
    params.country = country;
  }

  return params;
};

export const createSearchTerms = (searchTerms) => {
  let keyWords = "";

  searchTerms.forEach((item, index) => {
    const isItemLast = searchTerms.length === index + 1;
    const text = appendKeywordOperator(item, isItemLast);
    keyWords += text;
  });
  return keyWords;
};

export const appendKeywordOperator = (keyword, isLastItem) => {
  if (isLastItem || !keyword.logic) {
    return `"${keyword.name}" `;
  }
  return `"${keyword.name}" ${keyword.logic} `;
};

export const formatedDateAndTime = (v) => {
  if (!v) return { date: "", time: "" };

  const d = DateTime.fromISO(v);
  return {
    date: `${d.month} / ${d.day} / ${d.year.toString().slice(2)}`,
    time: d.toFormat("tt").toLowerCase(),
  };
};
