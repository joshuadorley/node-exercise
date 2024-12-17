class MockData {
  constructor(id, firstName, lastName, role = null) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.role = role;
    this._created = new Date().toString();
  }
}

const PREPOP_DATA = [
  new MockData(1, "Frodo", "Baggins", "admin"),
  new MockData(2, "Sam", "Gamgee", "member"),
  new MockData(3, "Merriadoc", "Brandybuck", "guest"),
  new MockData(4, "Peregrine", "Took", "guest"),
];

class MockDB {
  #data = [...PREPOP_DATA]; // Spread to prevent mutation of original prepopulated data
  #nextId = 5;

  /**
   * Asynchronously resets the dataset to the default values.
   */
  async reset() {
    this.#data = [...PREPOP_DATA]; // Reset the data by spreading the default values
    this.#nextId = 5; // Reset the ID counter
  }

  /**
   * Checks if the provided object contains valid keys matching MockData properties.
   * @param {MockData} obj
   * @returns {boolean}
   */
  isValidData(obj) {
    return Object.keys(obj).every((key) =>
      ["id", "firstName", "lastName", "role", "_created"].includes(key)
    );
  }

  /**
   * Adds a new user to the dataset.
   * @param {MockData} newUserDTO
   * @returns {{ insertedUser: MockData, success: boolean }}
   */
  async add(newUserDTO) {
    if (this.isValidData(newUserDTO)) {
      const newUser = new MockData(
        this.#nextId++,
        newUserDTO.firstName,
        newUserDTO.lastName,
        newUserDTO.role
      );

      this.#data.push(newUser);

      return {
        insertedUser: newUser,
        success: true,
      };
    } else {
      throw new Error("Invalid column names found");
    }
  }

  /**
   * Updates an existing user by ID.
   * @param {number} id
   * @param {MockData} updatedUserDTO
   * @returns {{ updatedRow: MockData, success: boolean }}
   */
  async update(id, updatedUserDTO) {
    if (this.isValidData(updatedUserDTO)) {
      let updatedUser = null;

      this.#data = this.#data.map((user) => {
        if (user.id == id) {
          updatedUser = { ...user, ...updatedUserDTO };
          return updatedUser;
        }
        return user;
      });

      if (!updatedUser) {
        throw new Error(`User with ID ${id} not found`);
      }

      return {
        updatedRow: updatedUser,
        success: true,
      };
    } else {
      throw new Error("Invalid column names found");
    }
  }

  /**
   * Retrieves a single user by ID.
   * @param {number} id
   * @returns {MockData | null}
   */
  async getOne(id) {
    const user = this.#data.find((u) => u.id == id);
    return user || null;
  }

  /**
   * Retrieves all users in the dataset.
   * @returns {MockData[]}
   */
  async getAll() {
    return this.#data;
  }

  /**
   * Deletes a user by ID.
   * @param {number} id
   * @returns {{ removedRowId: number, success: boolean }}
   */
  async remove(id) {
    const initialLength = this.#data.length;

    this.#data = this.#data.filter((user) => user.id != id);

    if (this.#data.length === initialLength) {
      throw new Error(`User with ID ${id} not found`);
    }

    return {
      removedRowId: id,
      success: true,
    };
  }
}

const db = new MockDB();

export default db;
