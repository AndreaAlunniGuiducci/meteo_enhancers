// timeZone in milisecond

export const useLocationDate = () => {
  const localGMT = new Date().getTimezoneOffset() * 60 * 1000;
  const today = Date.now();
  try {
    const todayLocation = (timeZone) => {
      return new Date(localGMT + today + timeZone);
    };
    return [todayLocation];
  } catch (e) {
    console.log(e);
  }
};
