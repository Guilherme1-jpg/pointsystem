class DateValidate {
  static isDateValid(entryTimestamp, exitTimestamp) {
    const currentTime = new Date();

    if (entryTimestamp.getTime() < currentTime.getTime()) {
      throw new Error(403, 'The start date must be greater than or equal to the current date');
    }

    if (exitTimestamp.getTime() <= entryTimestamp.getTime()) {
      throw new Error(403, 'The date end must be greater than start date');
    }

    return null;
  }
}

module.exports = DateValidate;
