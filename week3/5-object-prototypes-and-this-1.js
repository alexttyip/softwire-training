const animal = {
  init: function (name, species) {
    this.name = name;
    this.species = species;
    this.hunger = 100;
  },
  feed: function () {
    this.hunger -= 10;
    console.log(`${this.name} was fed, hunger level: ${this.hunger}.`);
  },
};

const zebra = Object.create(animal);
zebra.init("zebra", "zebra");

zebra.feed();

const lion = Object.create(animal);
lion.init("lion", "lion");

lion.feed();
zebra.feed();
