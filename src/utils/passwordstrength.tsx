export function getStrength(password:string) {
  let score = 0

  if (password.length >= 8) score += 25
  if (/[A-Z]/.test(password)) score += 25
  if (/[0-9]/.test(password)) score += 25
  if (/[^A-Za-z0-9]/.test(password)) score += 25

  if (score < 50)
    return { score, label: "Weak", color: "text-red-600", progresscolor: "[&>div]:bg-red-600"    }
  if (score < 75)
    return { score, label: "Medium", color: "text-yellow-500", progresscolor: "[&>div]:bg-yellow-500" }

  return { score, label: "Strong", color: "text-green-600" , progresscolor: "[&>div]:bg-green-600"}
}