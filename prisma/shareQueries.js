const prisma = require("./query");

exports.getFile = async (fileId) => {
  const file = await prisma.files.findUnique({
    where: {
      id: fileId,
    },
  });

  return file;
};
