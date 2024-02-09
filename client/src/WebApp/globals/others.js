export const randomMovieDescription = [
    "A skilled thief enters the dreams of others to steal their deepest secrets.",
    "A banker is sentenced to life in Shawshank State Penitentiary for a crime he didn't commit.",
    "Batman faces the chaotic Joker as he tries to bring justice to Gotham City.",
    "The life story of a man with a low IQ who inadvertently influences several defining moments in history.",
    "The intersecting lives of various criminals in the Los Angeles underworld.",
    "A love story set against the backdrop of the ill-fated maiden voyage of the R.M.S. Titanic.",
    "A computer hacker discovers the truth about reality and joins a group of rebels against sentient machines.",
    "A theme park with genetically engineered dinosaurs becomes a terrifying adventure for its visitors.",
    "The patriarch of a powerful crime family passes control to his reluctant son.",
    "A young farm boy joins a rebellion against an evil empire in a galaxy far, far away.",
  ]

  export function formatTime(minutes) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    const hourString = hours > 0 ? `${hours} hr${hours > 1 ? 's' : ''}` : '';
    const minuteString = remainingMinutes > 0 ? `${remainingMinutes} min${remainingMinutes > 1 ? 's' : ''}` : '';
    
    if (hours > 0 && remainingMinutes > 0) {
      return `${hourString} ${minuteString}`;
    } else if (hours > 0) {
      return hourString;
    } else {
      return minuteString;
    }
  }