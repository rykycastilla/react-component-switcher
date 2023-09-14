function getBigNumber(): number {
  const number: number = Math.random() * 1000000
  return Math.floor( number )
}

export default getBigNumber