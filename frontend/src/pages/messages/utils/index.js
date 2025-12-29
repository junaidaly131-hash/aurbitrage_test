export function formatTime(timestamp) {
  const date = new Date(timestamp);
  const today = new Date();

  const isSameDay =
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();

  if (isSameDay) {
    const options = {
      hour12: true,
      hour: "2-digit",
      minute: "2-digit",
    };
    let formattedTime = date.toLocaleTimeString(undefined, options);
    return formattedTime.replace(" AM", "am").replace(" PM", "pm");
  } else {
    const formattedDate = date.toLocaleDateString(undefined, {
      year: "2-digit",
      month: "numeric",
      day: "numeric",
    });
    return formattedDate;
  }
}
