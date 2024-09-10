import { carsService } from "../services/CarsService.js";
import BaseController from "../utils/BaseController.js";

export class CarsController extends BaseController {
  constructor() {
    super('api/cars')
    this.router
      .get('', this.getCars)
      // NOTE the client is now allowed to supply an id in the URL, and we will refer to it as carId in our code
      .get('/:carId', this.getCarById)
  }

  async getCarById(request, response, next) {
    try {
      const carId = request.params.carId
      const car = await carsService.getCarById(carId)
      response.send(car)
    } catch (error) {
      next(error)
    }
  }

  async getCars(request, response, next) {
    try {
      const query = request.query
      const cars = await carsService.getCars(query)
      response.send(cars)
    } catch (error) {
      next(error)
    }
  }
}
