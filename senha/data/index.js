import 'react-native-get-random-values'; // Importar no topo para UUID
import { v4 as uuidv4 } from 'uuid'; // Para gerar IDs únicos

// Dados dos pacientes
export const patients = []; // [{ id: '...', nome: '...', idade: '...', sexo: '...' }]

// Dados das senhas em espera
export const pendingPasswords = []; // [{ id: '...', patientId: '...', patientName: '...', age: '...', password: '...', specialty: '...', timestamp: '...' }]

// Senha atualmente chamada
export let currentCalledPassword = null;

export const setCurrentlyCalledPassword = (password) => {
  currentCalledPassword = password;
};

// Lógica de especialidades baseada na idade
export const getSpecialtiesByAge = (age) => {
  if (age >= 0 && age <= 12) {
    return ['Pediatria', 'Neuropediatria'];
  } else if (age >= 13 && age <= 18) {
    return ['Endocrinologia Pediátrica', 'Psiquiatria Infantil e Adolescente'];
  } else if (age >= 19 && age <= 40) {
    return ['Dermatologia', 'Ginecologia/Urologia'];
  } else if (age >= 41 && age <= 60) {
    return ['Cardiologia', 'Ortopedia'];
  } else if (age >= 61) {
    return ['Geriatria', 'Oftalmologia'];
  }
  return ['Especialidade Indefinida'];
};

// Geração de senhas com prefixo e sequencial
const specialtyPrefixes = {
  'Pediatria': 'PED',
  'Neuropediatria': 'NEU',
  'Endocrinologia Pediátrica': 'END',
  'Psiquiatria Infantil e Adolescente': 'PSI',
  'Dermatologia': 'DER',
  'Ginecologia/Urologia': 'GIN',
  'Cardiologia': 'CAR',
  'Ortopedia': 'ORT',
  'Geriatria': 'GER',
  'Oftalmologia': 'OFT',
};

const specialtyCounters = {}; // Para controlar o sequencial de cada especialidade

export const generateUniquePassword = (specialty) => {
  const prefix = specialtyPrefixes[specialty] || 'GEN';
  if (!specialtyCounters[specialty]) {
    specialtyCounters[specialty] = 0;
  }
  specialtyCounters[specialty]++;
  const sequence = String(specialtyCounters[specialty]).padStart(3, '0');
  return `${prefix}-${sequence}`;
};

// Lógica de prioridade para a fila de senhas
export const getNextPasswordForCall = () => {
  if (pendingPasswords.length === 0) {
    return null;
  }

  // Define a prioridade dos grupos (quanto menor o número, maior a prioridade)
  const priorityOrder = {
    'Geriatria': 1,
    'Oftalmologia': 1, // Idosos
    'Pediatria': 2,
    'Neuropediatria': 2, // Crianças
    'Cardiologia': 3,
    'Ortopedia': 3, // Meia-idade
    'Dermatologia': 4,
    'Ginecologia/Urologia': 4, // Adultos Jovens
    'Endocrinologia Pediátrica': 5,
    'Psiquiatria Infantil e Adolescente': 5, // Adolescentes
  };

  // Ordena as senhas pendentes primeiro por grupo de prioridade, depois por timestamp (FIFO)
  const sortedPasswords = [...pendingPasswords].sort((a, b) => {
    const priorityA = priorityOrder[a.specialty] || 99; // 99 para especialidades não mapeadas
    const priorityB = priorityOrder[b.specialty] || 99;

    if (priorityA !== priorityB) {
      return priorityA - priorityB; // Prioridade de grupo
    }
    return new Date(a.timestamp) - new Date(b.timestamp); // FIFO dentro do mesmo grupo
  });

  return sortedPasswords[0]; // Retorna a senha de maior prioridade
};