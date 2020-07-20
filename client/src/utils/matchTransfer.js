//See the "matchTransferFunction.py" in the analysis folder for analysis of this function

const exponent = 4

const matchTransfer = (ratio) => {
  return -Math.pow(1.0 - ratio, exponent) + 1.0
}

//Accepts a match ratio (from 0 to 1) as saved in the database
export default (matchRatio) => {
  const transferredMatch = matchTransfer(matchRatio)
  const matchPercent = transferredMatch * 100
  // return matchPercent.toPrecision(2) + '%'
  if (matchPercent > 10){
    return matchPercent.toFixed(0) + '%'
  }
  return matchPercent.toFixed(1) + '%'
}