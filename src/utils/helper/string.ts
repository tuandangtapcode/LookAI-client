export function getRegexPhoneNumber() {
  const regex = /^(\+84|84|0)+(9|3|7|8|5)+([0-9]{8})\b/g
  return regex
}

export const formatMoney = (money: number) => {
  return (Math.round(money * 100) / 100).toLocaleString().replaceAll(',', '.')
}

export const formatAIAnswer = (answer: string) => {
  return answer.replaceAll('\n', '<br/>')
}
