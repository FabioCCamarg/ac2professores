const professorModel = require("../models/professor");

exports.obterTodos = async (req, res) => {
  try {
    const professores = await professorModel.find();
    res.status(200).json(professores);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

exports.obterPorId = async (req, res) => {
  try {
    const professorId = await professorModel.findOne({ id: req.params.id });
    res.status(200).json(professorId);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

exports.obterTurmasProfessor = async (req, res) => {
  try {
    const professor = await professorModel.findOne({ id: req.params.id });

    res.status(200).json(professor.turmas);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

exports.atualizarProfessor = async (req, res) => {
  try {
    const { nome, idade, departamento } = req.body;

    const atualizarDadosProfessor = await professorModel.findOneAndUpdate(
      { id: req.params.id },
      { nome, idade, departamento },
      { new: true }
    );
    if (!atualizarDadosProfessor) {
      return res.status(404).json({ message: "Id não existente" });
    }
    res.status(200).json(atualizarDadosProfessor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.adicionarTurma = async (req, res) => {
  try {
    const professorId = req.params.id;
    const { codigo, disciplina, alunos } = req.body;
    const professor = await professorModel.findOne({ id: professorId });

    professor.turmas.push({ codigo, disciplina, alunos });

    await professor.save();

    res.status(200).json(professor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Método para listar professores por departamento
exports.obterPorDepartamento = async (req, res) => {
  try {
    const departamento = req.params.departamento;

    const professores = await professorModel.find({
      departamento: departamento,
    });
    res.status(200).json(professores);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deletarProfessor = async (req, res) => {
  try {
    const professorId = await professorModel.findOne({ id: req.params.id });
    const deleteProfessor = await professorModel.findByIdAndDelete(professorId);
    res.status(200).json(deleteProfessor);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};
