export const convertToUrlQuery = (object: {[key: string]: any}) => {
    const query =
  `?${
      Object.keys(object)
          .map(key => {
              return `${ key }=${ encodeURIComponent(object[key]) }`
          })
          .join('&') }`
    return query
}
