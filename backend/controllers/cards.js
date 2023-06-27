const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/not-found-err');
const BadRequest = require('../errors/not-found-err');

const cardModel = require('../models/card');
const {
  OK,
  // CREATED,
  NOT_FOUND,
  // BAD_REQUIEST,
  // UNAUTHORIZED_ERROR,
  FORBITTEN,
  INTERNAL_SERVER_ERROR,
  DocNotFound,
  // CastErr,
  ValErr,
  CREATED,
  CastErr,
  BAD_REQUIEST,
} = require('../statusServerName');

const getCards = (req, res, next) => {
  cardModel
    .find({})
    .populate(['owner', 'likes'])
    .then((cards) => {
      res.send({ cards });
    })
    .catch((err) => next(err));;
};

const deleteCardbyId = (req, res, next) => {
  cardModel
    .findById(req.params.cardid)
    .orFail()
    .then((card) => {
      if (!card) {
        next(new NotFoundError('Такой карточки нет'))
      }
      if (card.owner.toString() !== req.user._id ) {
        next(new ForbiddenError('Нет прав доступа'))
      }
      return cardModel.findByIdAndRemove(req.params.cardid).then(() => {
        res.status(OK).send({ message: 'Карточка успешно удалена' });
      });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Некоректный id'));
        return;
      };
      next(err);
    });
};

const createCard = (req, res) => {
  cardModel
    .create({ ...req.body, owner: req.user._id })
    .then((card) => card.populate('owner'))
    .then((card) => res.status(CREATED).send({ data: card }))
    .catch((err) => {
      if (err.name === ValErr) {
        return res.status(BAD_REQUIEST).send({
          message: 'Переданы некорректные данные при создании карточки',
        });
      }
      return res.status(INTERNAL_SERVER_ERROR).send({
        message: 'Произошла ошибка',
        err: err.message,
        stack: err.stack,
      });
    });
};

const likeCard = (req, res, next) => {
  cardModel.findByIdAndUpdate(req.params.cardid, { $addToSet: { likes: req.user } }, { new: true })
    .populate(['owner', 'likes'])
    .orFail(new NotFoundError(`Карточка с указанным _id не найдена`))
    .then((card) => {
      res.send(card);
    })
    .catch(err => next(err));
};

const dislikeCard = (req, res, next) => {

  cardModel.findByIdAndUpdate(req.params.cardid, { $pull: { likes: req.user._id } }, { new: true })
    .populate(['owner', 'likes'])
    .then((card) => {
      if (!card) {
        next(new NotFoundError('Карточка по указанному _id не найдена'));
      }
      res.send(card);
    })
    .catch(next);
};

module.exports = {
  getCards,
  deleteCardbyId,
  createCard,
  likeCard,
  dislikeCard,
};
