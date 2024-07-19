import axios from "axios";

export async function generateText()   {
  const url : string = `https://fish-text.ru/get?type=sentence&number=50&format=json`;
  let text:string[] = []
  return axios.get(url)
    .then(
      res => {
        if (res.status === 200) {
          text = res.data.text.split(" ")
        } else {
          text = ["ошибка"]
        }
      }
    ).then((res) => {
      return text
    })

}
