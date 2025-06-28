export default function getRoleBadgeVariant(role: string) {
  switch (role) {
    case "ADMIN":
      return "default";
    case "USER":
      return "secondary";
    default:
      return "outline";
  }
}