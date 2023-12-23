function stringToColor(string: string) {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}

function stringAvatar(name: string) {
  const wordList = name.split(" ");
  let firstWord;
  let lastWord;

  firstWord = wordList[0];

  if (wordList.length > 1) {
    lastWord = wordList[1];
  }

  const firstLetter1 = firstWord[0];
  let firstLetter2;

  if (lastWord) {
    firstLetter2 = lastWord[0];
  } else firstLetter2 = "";

  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${firstLetter1}${firstLetter2}`,
  };
}

export default stringAvatar;
