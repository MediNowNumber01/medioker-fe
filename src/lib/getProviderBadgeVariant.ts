export default function getProviderBadgeVariant(provider?: string) {
  switch (provider) {
    case "GOOGLE":
      return "outline";
    case "CREDENTIAL":
      return "secondary";
    default:
      return "outline";
  }
}