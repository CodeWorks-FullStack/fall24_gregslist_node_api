import { dbContext } from "../db/DbContext.js"
import { BadRequest } from "../utils/Errors.js"

class CarsService {
  async getCarById(carId) {
    // NOTE findById will find a single document by its _id property
    // NOTE populate will run a virtual attached to your schema. You supply the name of the virtual as the argument to populate
    const car = await dbContext.Cars.findById(carId).populate('creator')

    if (car == null) {
      throw new BadRequest(`No car found with the id of ${carId}`)
    }

    return car
  }

  async getCars(query) {
    const sortBy = query.sort
    // NOTE removes key:value pair from object
    delete query.sort

    const pageNumber = parseInt(query.page) || 1
    const limitAmount = 10
    const skipAmount = (pageNumber - 1) * limitAmount
    delete query.page

    const cars = await dbContext.Cars
      .find(query)
      .sort(sortBy + ' createdAt')
      .skip(skipAmount)
      .limit(limitAmount)
      .populate('creator') // populate will run on every document returned from find

    // NOTE this will count all documents in the database, and can also accept a filter object
    const carCount = await dbContext.Cars.countDocuments(query)

    return {
      results: cars,
      count: carCount,
      currentPage: pageNumber,
      totalPages: Math.ceil(carCount / limitAmount)
    }
  }
}

export const carsService = new CarsService()