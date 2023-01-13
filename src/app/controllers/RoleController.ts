import { Request, Response } from "express";
const RoleRepository = require("../repositories/RoleRepository");

class RoleController {
  async index(request: Request, response: Response) {
    const roles = await RoleRepository.findAll();

    return response.json(roles);
  }

  // show(request: Request, response: Response) {}

  async store(request: Request, response: Response) {
    const { name } = request.body;
    const isRoleAlreadyRegistered = await RoleRepository.findByName(name);

    const roles = [
      "Administrador",
      "Operacional",
      "Gerente de Projetos",
      "Consultor",
    ];

    const isRoleNameValid = (name: string) => roles.includes(name);

    if (!isRoleNameValid(name)) {
      return response.status(404).json({
        message: "Nome de cargo inválido para cadastro.",
      });
    }

    if (isRoleAlreadyRegistered)
      return response.status(422).json({
        message: "Um cargo com este nome já foi cadastrado",
      });

    const role = await RoleRepository.create(name);

    return response.status(200).json(role);
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const { name } = request.body;

    if (!name)
      return response
        .status(404)
        .json({ message: "O campo de nome é obrigatório." });

    const updatedRole = await RoleRepository.findByIdAndUpdate({ id, name });

    return response
      .status(200)
      .json({ message: "Cargo atualizado com sucesso.", updatedRole });
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    const role = await RoleRepository.findById(id);

    if (!role)
      return response
        .status(404)
        .json({ message: "Este cargo não foi encontrado." });

    await RoleRepository.delete(id);

    return response.status(204).json({ message: "Cargo apagado com sucesso." });
  }
}

module.exports = new RoleController();
