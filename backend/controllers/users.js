const userModel = require('../models/user');
const {
  OK,
  DocNotFound,
  ValErr,
} = require('../statusServerName');
const NotFound = require('../errors/not-found-err');
const BadRequest = require('../errors/bad-requiest');

const getUsers = (req, res, next) => {
  userModel
    .find({})
    .then((users) => {
      res.status(OK).send(users);
    })
    .catch((err) => next(err));
};

const getUserById = (req, res, next) => {
  userModel
    .findById(req.params.userid)
    .orFail()
    .then((user) => {
      if (user) res.status(OK).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Переданы некорректные данные'));
        return;
      }
      next(err);
    });
};

const updateUserInfo = (req, res, next) => {
  const { name, about } = req.body;
  userModel
    .findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .orFail()
    .then((user) => res.status(OK).send(user))
    .catch((err) => {
      if (err.name === ValErr) {
        next(new BadRequest('Переданы некорректные данные при создании пользователя'));
        return;
      }
      if (err.name === DocNotFound) {
        next(new NotFound('Пользователь не найден или _id пользователя некорректен'));
        return;
      }
      next(err);
    });
};

const getUserInfo = (req, res, next) => {
  const userId = req.user._id;
  userModel.findById(userId)
    .then((user) => res.send(user))
    .catch(next);
};

const updateAvatar = (req, res, next) => {
  userModel
    .findByIdAndUpdate(req.user._id, { ...req.body }, { new: true, runValidators: true })
    .orFail()
    .then((card) => {
      res.status(OK).send(card);
    })
    .catch((err) => {
      if (err.name === ValErr) {
        next(new BadRequest('Переданы некорректные данные при создании пользователя'));
        return;
      }
      if (err.name === DocNotFound) {
        next(new NotFound('Пользователь не найден или _id пользователя некорректен'));
        return;
      }
      next(err);
    });
};

module.exports = {
  getUsers,
  getUserById,
  updateUserInfo,
  updateAvatar,
  getUserInfo,
};
