import { Request, Response } from "express";
const ClientRepository = require("../repositories/ClientRepository");

class ClientController {
  async index(_request: Request, response: Response) {
    const clients = await ClientRepository.findAll();

    return response.json(clients);
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const client = await ClientRepository.findById(id);

    if (!client)
      return response
        .status(400)
        .json({ message: "Nenhum cliente encontrado." });

    return response
      .status(200)
      .json({ message: "Cliente encontrado com sucesso", client });
  }

  async store(request: Request, response: Response) {
    const {
      code,
      name,
      cnpj,
      cep,
      street,
      streetNumber,
      complement,
      district,
      city,
      state,
      periodIn,
      periodUntil,
      billingLimit,
      payDay,
      valueClient,
      gpClient,
    } = request.body;

    const isClientAlreadyRegistered = await ClientRepository.findByName(name);

    if (isClientAlreadyRegistered)
      return response
        .status(422)
        .json({ message: "Um cliente com este nome já foi cadastrado" });

    const client = await ClientRepository.create({
      code,
      name,
      cnpj,
      cep,
      street,
      streetNumber,
      complement,
      district,
      city,
      state,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      periodIn,
      periodUntil,
      billingLimit,
      payDay,
      valueClient,
      gpClient,
    });

    return response.status(200).json(client);
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const {
      code,
      name,
      cnpj,
      cep,
      street,
      streetNumber,
      complement,
      district,
      city,
      state,
      periodIn,
      periodUntil,
      billingLimit,
      payDay,
      valueClient,
      gpClient,
    } = request.body;

    const updatedClient = await ClientRepository.findByIdAndUpdate({
      id,
      code,
      name,
      cnpj,
      cep,
      street,
      streetNumber,
      complement,
      district,
      city,
      state,
      periodIn,
      periodUntil,
      billingLimit,
      payDay,
      valueClient,
      gpClient,
    });

    return response
      .status(200)
      .json({ message: "Cliente atualizado com sucesso.", updatedClient });
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    const client = await ClientRepository.findById(id);

    if (!client)
      return response
        .status(404)
        .json({ message: "Este cliente não foi encontrado." });

    await ClientRepository.delete(id);

    return response
      .status(204)
      .json({ message: "Cliente deletado com sucesso." });
  }
}

module.exports = new ClientController();
