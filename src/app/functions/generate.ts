export const generate = (arr : string[], num: number) => {
  let words : string[] = [];
  for(let i : number = 0; i < num; i++) {
    let rand =  Math.floor(Math.random() * (arr.length));
    words.push(arr[rand]);
  }
  return words
}
