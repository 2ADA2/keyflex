import {randomInt} from "./randomInt";

export const generate = (arr : string[], num: number, isSymbols:boolean = false) => {
  let words : string[] = [];
  if(isSymbols) {
    const symbols: string = "йцукенгшщзхъфывапролджэячсмитьбю.";
    for(let i = 1; i < num; i++) {
      const len:number = randomInt(1,10)
      let word:string = ""
      for(let j = 0; j < len; j++) {
        word += symbols[randomInt(0, symbols.length - 1)]
      }
      words.push(word)
    }
    return words
  }

  for(let i : number = 0; i < num; i++) {
    let rand =  Math.floor(Math.random() * (arr.length));
    words.push(arr[rand]);
  }
  return words
}
