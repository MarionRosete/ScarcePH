export function pendingColor(count: number) {
  if (count === 0) return "text-green-400"
  if (count <= 2) return "text-amber-400"
  return "text-red-400"
}

export function balanceColor(amount: number) {
  if (amount === 0) return "text-green-400"
  if (amount <= 5000) return "text-amber-400"
  return "text-red-400"
}

export function deltaColor(delta: number) {
  if (delta > 0) return "text-green-400"
  if (delta < 0) return "text-red-400"
  return "text-muted-foreground"
}


export function formatPeso(amount: number) {
  const sign = amount < 0 ? "-" : ""
  const value = Math.abs(amount).toLocaleString()

  return `${sign}₱${value}`
}

export function normalizePair(pair:string){
  if(!pair) return ''
    if(pair.toLocaleLowerCase().includes('nike sb stefan janoski')){
        const pairName = pair.toLocaleLowerCase().replace("nike sb stefan janoski", "");
       return pairName.toLocaleUpperCase()
    }
}
