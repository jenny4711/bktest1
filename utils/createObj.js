 const createObj = (infoArray) => {
  const destinations = [];
  let currentDestination = {};

  infoArray.forEach((info) => {
    if (info.match(/^\d+\./)) { // 새로운 명소의 시작을 감지
      if (currentDestination.location) { // 현재 명소가 존재하면 배열에 추가
        destinations.push(currentDestination);
        currentDestination = {}; // 새 명소를 위해 리셋
      }
    }

    const [key, value] = info.split(/: (.+)/); // 첫 번째 콜론을 기준으로 키와 값 분리
    if (key.includes('위치')) {
      currentDestination.location = value.trim();
    } else if (key.includes('주소')) {
      currentDestination.address = value.trim();
    } else if (key.includes('설명')) {
      currentDestination.description = value.trim();
    } else if (key.includes('위도')) {
      currentDestination.latitude = parseFloat(value.trim());
    } else if (key.includes('경도')) {
      currentDestination.longitude = parseFloat(value.trim());
    }
  });

  // 마지막 명소 추가
  if (currentDestination.location) {
    destinations.push(currentDestination);
  }
console.log(destinations,'des')
  return destinations;
};


module.exports = {createObj}