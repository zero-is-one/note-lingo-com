export function arrayMove<T>(arr: T[], fromIndex: number, toIndex: number) {
  const newArr = [...arr];
  newArr.splice(toIndex, 0, newArr.splice(fromIndex, 1)[0]);
  return newArr;
}

export function shuffle<T>(array: T[]): T[] {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}
