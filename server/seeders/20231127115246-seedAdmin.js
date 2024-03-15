'use strict';
const fs = require('fs')
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(8)

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
    let data = JSON.parse(fs.readFileSync('./data/dataUser.json','utf8'))
    .map(el => {
      el.updatedAt = new Date()
      el.createdAt = new Date()
      el.password = bcrypt.hashSync(`${el.password}`,salt)
      return el
    })

    await queryInterface.bulkInsert('Users', data, {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {});
  }
};
