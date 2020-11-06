const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");

class Cities {
  constructor(
    title,
    location,
    numberOfResidents,
    square,
    yearOfFoundation,
    image
  ) {
    this.title = title;
    this.location = location;
    this.numberOfResidents = numberOfResidents;
    this.square = square;
    this.yearOfFoundation = yearOfFoundation;
    this.image = image;
    this.id = uuidv4();
  }
  toJSON() {
    return {
      title: this.title,
      location: this.location,
      numberOfResidents: this.numberOfResidents,
      square: this.square,
      yearOfFoundation: this.yearOfFoundation,
      image: this.image,
      id: this.id,
    };
  }
  async save() {
    const courses = await Cities.getAll();
    courses.push(this.toJSON());

    return new Promise((resolve, reject) => {
      fs.writeFile(
        path.join(__dirname, "..", "data", "cities.json"),
        JSON.stringify(courses),
        (err) => {
          if (err) reject(err);
          else {
            resolve();
          }
        }
      );
    });
  }

  static async update(city) {
    const cityes = await Cities.getAll();
    const idx = cityes.findIndex((c) => c.id === city.id);
    cityes[idx] = city;
    return new Promise((resolve, reject) => {
      fs.writeFile(
        path.join(__dirname, "..", "data", "cities.json"),
        JSON.stringify(cityes),
        (err) => {
          if (err) reject(err);
          else {
            resolve();
          }
        }
      );
    });
  }

  static getAll() {
    return new Promise((resolve, reject) => {
      fs.readFile(
        path.join(__dirname, "..", "data", "cities.json"),
        "utf-8",
        (err, content) => {
          if (err) {
            reject(err);
          } else {
            resolve(JSON.parse(content));
          }
        }
      );
    });
  }
  static async delete(id) {
    debugger;
    const cities = await Cities.getAll();
    debugger;
    console.log("cities delete", cities);
    debugger;
    return cities.filter((city) => city.id !== id);
  }

  static async getById(id) {
    const cities = await Cities.getAll();
    return cities.find((city) => city.id === id);
  }
}

module.exports = Cities;
