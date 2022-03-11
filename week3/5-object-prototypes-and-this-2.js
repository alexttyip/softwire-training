const zoo = { cash: 4000 };

const herbivore = {
  feedHerbivoreFood: function () {
    if (this.hungerMeter < this.maxFullnessValue) {
      this.hungerMeter += 1;
      zoo.cash -= 200;
    }
    console.log(
      `You have just fed the herbivore ${this.species} ${this.name} and it now has fullness of ${this.hungerMeter}`
    );
  },
};

const carnivore = {
  feedCarnivoreFood: function () {
    if (this.hungerMeter < this.maxFullnessValue) {
      this.hungerMeter += 1;
      zoo.cash -= 200;
    }
    console.log(
      `You have just fed the carnivore ${this.species} ${this.name} and it now has fullness of ${this.hungerMeter}`
    );
  },
};

const animal = {
  init: function (name, species, diet) {
    this.name = name;
    this.species = species;
    this.hungerMeter = 50;
    this.maxFullnessValue = 100;
    this.feed = diet.feedHerbivoreFood || diet.feedCarnivoreFood;
  },
};

const animalCreator = {
  createAnimal: function (name, speciesName, diet) {
    const myAnimal = Object.create(animal);
    myAnimal.init(name, speciesName, diet);
    return myAnimal;
  },
  createZebra(name) {
    return this.createAnimal(name, "Zebra", herbivore);
  },
  createLion(name) {
    return this.createAnimal(name, "Lion", carnivore);
  },
  createChinchilla(name) {
    return this.createAnimal(name, "Chinchilla", herbivore);
  },
  createFerret(name) {
    return this.createAnimal(name, "Ferret", carnivore);
  },
};

const buttons = [
  {
    onClick(name) {
      return animalCreator.createZebra(name);
    },
  },
  {
    onClick(name) {
      return animalCreator.createLion(name);
    },
  },
  {
    onClick(name) {
      return animalCreator.createChinchilla(name);
    },
  },
  {
    onClick(name) {
      return animalCreator.createFerret(name);
    },
  },
];

function getButton(idx) {
  return buttons[idx];
}

const zebraButton = getButton(2);
const bobTheZebra = zebraButton.onClick("bob");

bobTheZebra.feed();
