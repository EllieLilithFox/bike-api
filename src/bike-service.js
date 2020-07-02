export async function getStolenBikes(location) {
  let response = await fetch(`https://bikeindex.org/api/v3/search?page=1&per_page=25&location=${location}&distance=10&stolenness=proximity`);
  let data = await response.json();
  return data;
}