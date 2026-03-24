function negationValue(negations, value) {
  return negations.length % 2 === 0 ? Boolean(value) : !Boolean(value);
}

function ipToNum(ip) {
  return ip.split('.').reduce((acc, octet, i) => {
    return acc + (Number(octet) << (8 * (3 - i)));
  }, 0);
}

function numToIp(num) {
  const octets = [];
  for (let i = 3; i >= 0; i--) {
    octets.unshift((num >> (8 * i)) & 255);
  }
  return octets.join('.');
}

module.exports = { negationValue, ipToNum, numToIp };