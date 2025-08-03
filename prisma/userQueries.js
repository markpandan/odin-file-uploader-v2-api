const prisma = require("./query");
const util = require("../lib/passwordUtils");

exports.createNewUser = async (usersFields) => {
  const { username, email, password } = usersFields;
  const hashedPassword = await util.encryptPassword(password);

  await prisma.users.create({
    data: {
      username,
      email,
      password: hashedPassword,
    },
  });
};

exports.getUserByUsername = async (username) => {
  const user = await prisma.users.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
      username: true,
      email: true,
      password: true,
    },
  });

  return user;
};

exports.getUserByEmail = async (email) => {
  const user = await prisma.users.findUnique({
    where: {
      email,
    },
  });

  return user;
};
