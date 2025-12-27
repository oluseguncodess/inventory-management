export const formattedName = (name: string): string => {
  return name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')
}

export function lowercaseEmailUsername(email: string): string {
  const [username, domain] = email.split("@");
  return `${username.toLowerCase()}@${domain}`;
}