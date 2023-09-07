module.exports = {
    format_date: (date) => {
      const d = new Date(date);
      const months = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
      ];
      const formattedDate = `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
      const hours = d.getHours().toString().padStart(2, '0');
      const minutes = d.getMinutes().toString().padStart(2, '0');
      const formattedTime = `${hours}:${minutes}`;
  
      return `${formattedDate} ${formattedTime}`;
    },
  };
  