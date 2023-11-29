process.env.NODE_DEV = "TEST";
const pokeapi = require("../pokeapi");

describe("getRandomNumbers", () => {
  it("gets the correct amount of unique random numbers", () => {
    jest
      .spyOn(global.Math, "random")
      .mockReturnValueOnce(0.2223552)
      .mockReturnValueOnce(0.2223552)
      .mockReturnValueOnce(0.000001)
      .mockReturnValueOnce(0.56732)
      .mockReturnValueOnce(0.2223552)
      .mockReturnValueOnce(0.2223552)
      .mockReturnValue(0.9989876);
    const result = pokeapi.getRandomNumbers(4, 0, 99);
    expect(result).toEqual([22, 0, 56, 99]);
  });
});
