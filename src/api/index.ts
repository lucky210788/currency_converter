const baseUrl: string = 'https://v6.exchangerate-api.com/v6/';
// export const APIKey: string = '6a34af1acfdc7863022df2ce';
// export const APIKey: string = '7cc8565835b9b47e14685f57';
const APIKey: string = '180f57a83c04f3baa14c0c2a';

export const api = {
  latest: `${baseUrl}${APIKey}/latest/`,
  pair: `${baseUrl}${APIKey}/pair/`
}

