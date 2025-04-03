'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    // generate du lieu fake
    await queryInterface.bulkInsert('User', 
    [
      {
      email: 'alan@gmail.com',
      username: 'alan',
      password: 'mvmgxf1',
      },
      {
        email: 'john@gmail.com',
        username: 'john',
        password: 'mvmgxf2',
      },
      {
        email: 'lane@gmail.com',
        username: 'lane',
        password: 'mvmgxf3',
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
