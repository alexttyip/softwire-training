import { GildedRose, Item } from "@/gilded-rose";

describe("Gilded Rose items", () => {
  it("should have a SellIn value", () => {
    const item = new Item("name", 10, 20);

    expect(item).toHaveProperty("sellIn");
    expect(item.sellIn).toBe(10);
  });

  it("should have a Quality value", () => {
    const item = new Item("name", 10, 20);

    expect(item).toHaveProperty("quality");
    expect(item.quality).toBe(20);
  });
});

describe("Gilded Rose", () => {
  it("should decrease SellIn and Quality values", () => {
    const rose = new GildedRose([new Item("Item 1", 10, 20)]);

    rose.updateQualityAndSellIn();

    const item1 = rose.items[0];
    expect(item1.sellIn).toBe(9);
    expect(item1.quality).toBe(19);
  });

  it("should decrease Quality twice as fast after sell by date", () => {
    const rose = new GildedRose([new Item("Item 1", 0, 20)]);

    rose.updateQualityAndSellIn();

    const item1 = rose.items[0];
    expect(item1.quality).toBe(18);
  });

  it("should not have negative quality", () => {
    const rose = new GildedRose([new Item("Item 1", 10, 0)]);

    rose.updateQualityAndSellIn();

    const item1 = rose.items[0];
    expect(item1.quality).toBe(0);
  });

  it("should increase the Quality of Aged Brie over time", () => {
    const rose = new GildedRose([new Item("Aged Brie", 10, 10)]);

    rose.updateQualityAndSellIn();

    const agedBrie = rose.items[0];
    expect(agedBrie.quality).toBe(11);
  });

  it("should not have quality over 50", () => {
    const rose = new GildedRose([new Item("Aged Brie", 10, 50)]);

    rose.updateQualityAndSellIn();

    const agedBrie = rose.items[0];
    expect(agedBrie.quality).toBe(50);
  });

  it("should not decrease the Quality or SellIn value of Sulfuras", () => {
    const rose = new GildedRose([
      new Item("Sulfuras, Hand of Ragnaros", 10, 40),
    ]);

    rose.updateQualityAndSellIn();

    const sulfuras = rose.items[0];

    expect(sulfuras.sellIn).toBe(10);
    expect(sulfuras.quality).toBe(40);
  });
});

describe("Backstage passes", () => {
  it("should increase by 1 when SellIn is more than 10", () => {
    const rose = new GildedRose([
      new Item("Backstage passes to a TAFKAL80ETC concert", 11, 40),
    ]);

    rose.updateQualityAndSellIn();

    const passes = rose.items[0];

    expect(passes.sellIn).toBe(10);
    expect(passes.quality).toBe(41);
  });

  it("should increase by 2 when SellIn is 10 or less", () => {
    const rose = new GildedRose([
      new Item("Backstage passes to a TAFKAL80ETC concert", 10, 40),
    ]);

    rose.updateQualityAndSellIn();

    const passes = rose.items[0];

    expect(passes.sellIn).toBe(9);
    expect(passes.quality).toBe(42);
  });

  it("should increase by 3 when SellIn is 5 or less", () => {
    const rose = new GildedRose([
      new Item("Backstage passes to a TAFKAL80ETC concert", 5, 40),
    ]);

    rose.updateQualityAndSellIn();

    const passes = rose.items[0];

    expect(passes.sellIn).toBe(4);
    expect(passes.quality).toBe(43);
  });

  it("should be worthless after the concert", () => {
    const rose = new GildedRose([
      new Item("Backstage passes to a TAFKAL80ETC concert", 0, 40),
    ]);

    rose.updateQualityAndSellIn();

    const passes = rose.items[0];

    expect(passes.sellIn).toBe(-1);
    expect(passes.quality).toBe(0);
  });
});
