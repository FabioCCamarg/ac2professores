const express = require('express');
const router = express.Router();
const professorController = require('../controllers/professorController.js');

// Rota para obter todos os usuários
router.get('/', professorController.obterTodos);
router.get('/:id', professorController.obterPorId);
router.get('/:id/turmas', professorController.obterTurmasProfessor);
router.put('/:id', professorController.atualizarProfessor);
router.post('/:id/turmas', professorController.adicionarTurma);
router.get('/departamento/:departamento', professorController.obterPorDepartamento);
router.delete('/:id', professorController.deletarProfessor);

module.exports = router;