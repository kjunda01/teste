export const formatProprietarioValues = (proprietario) => [
  proprietario.nome,
  proprietario.matricula,
  ];
  

  export const formatProprietarioValuesWithId = (proprietario) => [
    ...formatProprietarioValues(proprietario),
    proprietario.id
  ];
  