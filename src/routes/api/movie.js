import { Router } from 'express';
import * as moviesController from '@src/controllers/api/movies.controller';

const router = Router();

router.post('/add-movie', moviesController.postMovie);
router.get('/screens/:id', moviesController.getScreenById);
router.get('/screens', moviesController.getAllScreens);
router.get('/:id', moviesController.getMovieTimes);
router.get('/', moviesController.getAllMovies);

export default router;