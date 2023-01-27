const Log = require("../models/LogsSchema");

class LogRepository {
  async findAll() {
    const logs = await Log.find();

    return logs;
  }

  async findByIdAndUpdate({ id, name, surname, action }) {
    const log = await Log.findOneAndUpdate(
      { _id: id },
      {
        name,
        surname,
        action,
        updatedAt: Date.now(),
      }
    );

    return log;
  }

  async findById(id: string) {
    const log = await Log.findOne({ _id: id });

    return log;
  }

  async create({ name, surname, role, action, createdAt, updatedAt }) {
    const log = new Log({
      name,
      surname,
      role,
      action,
      createdAt,
      updatedAt,
    });

    await log.save();
    return log;
  }

  async delete(id: string) {
    await Log.findOneAndDelete({ _id: id });
    return;
  }
}

module.exports = new LogRepository();
