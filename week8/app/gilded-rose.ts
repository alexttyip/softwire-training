export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQualityAndSellIn(): Array<Item> {
    return this.items.map((item) => {
      switch (item.name) {
        case "Sulfuras, Hand of Ragnaros":
          return item; // Do nothing
        case "Aged Brie":
          GildedRose.getItemWithNewAgeBrieQuality(item);
          break;
        case "Backstage passes to a TAFKAL80ETC concert":
          GildedRose.getBackstagePassQuality(item);
          break;
        default:
          GildedRose.getNormalItemQuality(item);
          break;
      }

      GildedRose.limitQualityValue(item);

      item.sellIn -= 1;

      return item;
    });
  }

  private static getItemWithNewAgeBrieQuality(item: Item): void {
    item.quality += 1;
  }

  private static getBackstagePassQuality(item: Item): void {
    if (item.sellIn > 10) {
      item.quality += 1;
    } else if (item.sellIn > 5) {
      item.quality += 2;
    } else if (item.sellIn > 0) {
      item.quality += 3;
    } else {
      item.quality = 0;
    }
  }

  private static getNormalItemQuality(item: Item): void {
    if (item.sellIn > 0) {
      item.quality -= 1;
    } else {
      item.quality -= 2;
    }
  }

  private static limitQualityValue(item: Item): void {
    item.quality = Math.max(item.quality, 0);
    item.quality = Math.min(item.quality, 50);
  }
}
