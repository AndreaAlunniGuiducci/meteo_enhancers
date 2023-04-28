// timeZone in milisecond

export const useLocationDate = () => {
  const localGMT = new Date().getTimezoneOffset() * 60 * 1000;
  try {
    const todayLocation = (timeZone, today) => {
      today = today ?? Date.now();
      return new Date(localGMT + today + timeZone);
    };
    return [todayLocation];
  } catch (e) {
    console.error(e);
  }
};
