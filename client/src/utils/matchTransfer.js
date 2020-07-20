//See the "matchTransferFunction.py" in the analysis folder for analysis of this function



const matchTransfer = (ratio, exp=4) => {
  return -Math.pow(1.0 - ratio, exp) + 1.0
}

const lowExponent = 5;
const highExponent = 3;
// This transfer function favors a low exponent for high values
// and favors a high exponent for lower values
const weightedTransfer = (ratio) => {
  const lowTransfer = matchTransfer(ratio, lowExponent)
  console.log(lowTransfer)
  const highTransfer = matchTransfer(ratio, highExponent)
  console.log(highTransfer)
  return lowTransfer * (1.0-ratio) + highTransfer * (ratio)
}

//Accepts a match ratio (from 0 to 1) as saved in the database
export default (matchRatio) => {
  // const transferredMatch = matchTransfer(matchRatio)
  const transferredMatch = weightedTransfer(matchRatio)
  const matchPercent = transferredMatch * 100
  // return matchPercent.toPrecision(2) + '%'
  if (matchPercent > 10){
    return matchPercent.toFixed(0) + '%'
  }
  return matchPercent.toFixed(1) + '%'
}