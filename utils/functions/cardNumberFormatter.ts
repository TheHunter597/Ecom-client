export default function formatCardNumber(number: string) {
  if (typeof number !== "string") {
    number = JSON.stringify(number);
  }
  const formattedNumber = number.replace(/\s/g, "").match(/.{1,4}/g);
  return formattedNumber ? formattedNumber.join(" ") : "CARD NUMBER";
}
