export default {
  state: {
    savedRecords: [],
    gameResult: null,
  },
  mutations: {
    setGameResult(state, gameResult) {
      if (state.gameResult !== null) {
        throw "Overriding an existing game result is not allowed.";
      }
      gameResult.id = state.savedRecords.length + 1;
      state.gameResult = gameResult;
    },
    saveGameResultWithName(state, name) {
      if (state.gameResult === null) {
        throw "No game result to save.";
      }
      const gameResult = state.gameResult;
      state.gameResult = null;
      gameResult.name = name;
      state.savedRecords.push(gameResult);
    }
  }
};