export const generateMegaSenaNumbers = () => {
  const numbers = [];
  while (numbers.length < 6) {
    const randomNumber = Math.floor(Math.random() * 60) + 1;
    if (!numbers.includes(randomNumber)) {
      numbers.push(randomNumber);
    }
  }
  return numbers.sort((a, b) => a - b);
};

export const checkResult = (userNumbers, megaSenaNumbers) => {
  let hits = 0;
  for (const number of userNumbers) {
    if (megaSenaNumbers.includes(number)) {
      hits++;
    }
  }
  return hits;
};