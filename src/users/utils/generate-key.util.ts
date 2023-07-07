export const generateUserKey = () => {
  let code = '#';

  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * 9);
    code += randomIndex;
  }

  return code;
};
