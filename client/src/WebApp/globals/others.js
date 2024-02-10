export const randomMovieDescription = [
  "A sci-fi thriller set in a post-apocalyptic world where robots have taken over.",
  "A romantic comedy about two strangers who meet on a deserted island.",
  "A historical drama based on the life of a famous artist.",
  "An action-packed adventure featuring a group of treasure hunters.",
  "A fantasy epic set in a magical kingdom threatened by darkness.",
  "A horror movie about a haunted house with a dark secret.",
  "A coming-of-age story set in a small town during the summer.",
  "A psychological thriller about a woman who suspects her neighbor is a serial killer.",
  "A comedy about a dysfunctional family reunited for a wedding.",
  "A mystery film following a detective solving a series of murders.",
  "A biographical film about a famous musician's rise to stardom.",
  "A science fiction movie exploring the consequences of time travel.",
  "A romantic drama set against the backdrop of war.",
  "An animated adventure featuring talking animals on a quest.",
  "A crime thriller centered around a heist gone wrong.",
  "A fantasy film about a young hero destined to save the world.",
  "A historical romance set in ancient Rome.",
  "A comedy about a group of friends on a road trip.",
  "A horror anthology featuring different supernatural stories.",
  "A psychological thriller about a woman with amnesia trying to uncover her past.",
  "A sci-fi action movie set in space during a galactic war.",
  "A romantic comedy about a fake relationship that turns real.",
  "A drama about the struggles of a family dealing with addiction.",
  "An adventure film about a quest for a mythical treasure.",
  "A mystery thriller with a plot twist at every turn.",
  "A biopic about a famous inventor and their groundbreaking discoveries.",
  "A supernatural horror film set in a haunted asylum.",
  "A coming-of-age comedy about teenagers navigating high school.",
  "A sci-fi dystopian film exploring a society divided by class.",
  "A romantic fantasy about star-crossed lovers from different worlds.",
  "A crime drama inspired by true events.",
  "A comedy about a group of retirees starting a new business venture.",
  "A horror movie set in a remote cabin in the woods.",
  "A historical epic about a legendary warrior's quest for vengeance.",
  "A romantic drama set in the roaring twenties.",
  "A fantasy adventure featuring mythical creatures and magical artifacts.",
  "A mystery thriller about a detective investigating a series of disappearances.",
  "A biographical film about a famous athlete's journey to the Olympics.",
  "A sci-fi action movie about a rebellion against a tyrannical government.",
  "A romantic comedy set in a small town during the holidays.",
  "A psychological horror film exploring the depths of the human mind.",
  "An animated musical about a group of animals putting on a talent show.",
  "A crime thriller about a cat-and-mouse game between a detective and a serial killer.",
  "A fantasy epic based on a popular book series.",
  "A romantic drama about a forbidden love affair.",
  "A comedy about a group of misfits competing in a quirky competition.",
  "A horror movie about a cursed artifact unleashing terror on its owners."
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

  export function generateUniqueId() {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }