const router = require('express').Router();
// eslint-disable-next-line import/no-extraneous-dependencies
const userRoutes = require('./users');
const cardRoutes = require('./cards');
const auth = require('../middlewares/auth');
const authorization = require('../controllers/auth');
const NotFoundError = require('../errors/not-found-err');

const {
  createUserValid,
  loginUserValid,
} = require('../middlewares/validation');

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
}); 

router.post('/signup', createUserValid, authorization.createUser);
router.post('/signin', loginUserValid, authorization.loginUser);

router.use(auth);

router.use('/cards', cardRoutes);
router.use('/users', userRoutes);

router.use((req, res, next) => {
  next(NotFoundError('Запрашиваемая страница не существует'));
});

module.exports = router;
