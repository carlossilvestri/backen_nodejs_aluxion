import { NextFunction, Request, Response } from "express"

/**
 * 
 * Transforma los párametros de QS "/page=X&size=Y":
 * - page: número de página (omisión: constants.PAGINATION.PAGE)
 * - size: número de elementos por página (constants.PAGINATION.SIZE)
 *
 * En un objeto JSON que se inserta en el body de la petición:
 * - pagination  : contenedor
 *      - limit  : size
 *      - offset : indice a partir del cual se obtendrán $limit elementos
 * 
 */
 export default (req: Request, res: Response, next: NextFunction) => {
    const page = +(req.query.page || 1)
    const size = +(req.query.size || 20)
    const limit = size
    const offset = (page - 1) * limit
    req.body.pagination = { limit, offset }
    next()
}