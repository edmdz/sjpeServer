export default function getTimestamps(month){
  let firstDate = Date.parse(`2018-${month}-01T00:00:00`)
  let secondDate = Date.parse(`2018-${month}-31T00:00:00`)
  return ([firstDate, secondDate])    
}