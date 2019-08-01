import faker from "faker";

export const getItems = (count = 0, editable = true) =>
  new Array(count).fill(true).map(() => {
    return {
      phrase: faker.hacker.phrase(),
      name: faker.name.findName(),
      avatar: faker.image.avatar(),
      company: faker.company.companyName(),
      following: faker.random.boolean(),
      editable
    };
  });

export const isChrome =
  /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);

export function inIframe() {
  try {
    return window.self !== window.top;
  } catch (e) {
    return true;
  }
}

export function getUrlParameter(n, location = window.location) {
  const name = n.replace(/[[]/, "\\[").replace(/[\]]/, "\\]");
  const regex = new RegExp(`[\\?&]${name}=([^&#]*)`);
  const results = regex.exec(location.search);
  return results === null
    ? ""
    : decodeURIComponent(results[1].replace(/\+/g, " "));
}
