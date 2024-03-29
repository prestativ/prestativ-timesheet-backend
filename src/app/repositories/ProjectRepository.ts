const Project = require("../models/ProjectSchema");

class ProjectRepository {
  async findAll() {
    const projects = await Project.find()
      .populate([
        { path: "activities" },
        { path: "idClient", select: "_id name" },
        { path: "gpProject", select: "_id name surname" },
        {
          path: "businessUnit",
          select: "_id nameBU relUser",
          populate: {
            path: "relUser",
            select: "_id name surname",
          },
        },
      ])
      .lean()
      .exec();

    return projects;
  }

  async findClientIdByProjectId(id: string) {
    const project = await Project.findOne({ _id: id })
      .populate([
        { path: "activities" },
        { path: "idClient", select: "_id name" },
        { path: "gpProject", select: "_id name surname" },
        {
          path: "businessUnit",
          select: "_id nameBU relUser",
          populate: {
            path: "relUser",
            select: "_id name surname",
          },
        },
      ])
      .lean()
      .exec();

    return project.idClient._id;
  }

  async findSome(startIndex) {
    const projects = await Project.find()
      .limit(10)
      .skip(startIndex)
      .populate([
        { path: "activities" },
        { path: "idClient", select: "_id name" },
        { path: "gpProject", select: "_id name surname" },
        {
          path: "businessUnit",
          select: "_id nameBU relUser",
          populate: {
            path: "relUser",
            select: "_id name surname",
          },
        },
      ])
      .lean()
      .exec();

    return projects;
  }

  async findByName(name: string) {
    const project = Project.findOne({ name: name })
      .populate([
        { path: "activities" },
        { path: "idClient", select: "_id name" },
        { path: "gpProject", select: "_id name surname" },
        {
          path: "businessUnit",
          select: "_id nameBU relUser",
          populate: {
            path: "relUser",
            select: "_id name surname",
          },
        },
      ])
      .lean()
      .exec();

    return project;
  }

  async create({
    title,
    idClient,
    valueProject,
    gpProject,
    description,
    businessUnit,
    createdAt,
    updatedAt,
  }) {
    const project = new Project({
      title,
      idClient,
      valueProject,
      gpProject,
      description,
      businessUnit,
      createdAt,
      updatedAt,
    });

    await project.save();

    return project;
  }

  async findByIdAndUpdate({
    id,
    title,
    idClient,
    valueProject,
    gpProject,
    description,
    activities,
    businessUnit,
  }) {
    const project = await Project.findOneAndUpdate(
      { _id: id },
      {
        title: title,
        idClient: idClient,
        valueProject: valueProject,
        gpProject: gpProject,
        description: description,
        updatedAt: Date.now(),
        activities,
        businessUnit,
      }
    )
      .populate([
        { path: "activities" },
        { path: "idClient", select: "_id name" },
        { path: "gpProject", select: "_id name surname" },
        {
          path: "businessUnit",
          select: "_id nameBU relUser",
          populate: {
            path: "relUser",
            select: "_id name surname",
          },
        },
      ])
      .lean()
      .exec();
    return project;
  }

  async findById(id: string) {
    const project = await Project.findOne({ _id: id })
      .populate([
        { path: "activities" },
        { path: "idClient", select: "_id name" },
        { path: "gpProject", select: "_id name surname" },
        {
          path: "businessUnit",
          select: "_id nameBU relUser",
          populate: {
            path: "relUser",
            select: "_id name surname",
          },
        },
      ])
      .lean()
      .exec();

    return project;
  }

  async delete(id: string) {
    await Project.findOneAndDelete({ _id: id });
    return;
  }
}

module.exports = new ProjectRepository();
