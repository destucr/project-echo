export default function ApiResponse({ message }) {
  return message ? (
    <p className="text-green-400 mt-4 font-medium">{message}</p>
  ) : null;
}