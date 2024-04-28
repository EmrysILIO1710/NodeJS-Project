const fileNameGenerator = (actualFileName, userId, currTimestamp) => {
    const fileName = `${currTimestamp}_${userId}-${actualFileName}`;
    return fileName;
}

module.exports = fileNameGenerator;