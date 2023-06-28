const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/not-found-err');
const BadRequest = require('../errors/not-found-err');

const cardModel = require('../models/card');
const {
  OK,
} = require('../statusServerName');

const getCards = (req, res, next) => {
  cardModel
    .find({})
    .populate(['owner', 'likes'])
    .then((cards) => {
      res.send({ cards });
    })
    .catch((err) => next(err));
};

const deleteCardbyId = (req, res, next) => {
  cardModel
    .findById(req.params.cardid)
    .orFail()
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Такой карточки нет');
      }
      if (card.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Нет прав доступа');
      }
      return cardModel.findByIdAndRemove(req.params.cardid).then(() => {
        res.status(OK).send({ message: 'Карточка успешно удалена' });
      });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Некоректный id'));
        return;
      }
      next(err);
    });
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user;
  cardModel.create({ name, link, owner })
    .then((card) => card.populate('owner'))
    .then((card) => res.status(201).send(card))
    .catch((err) => next(err));
};

const likeCard = (req, res, next) => {
  cardModel.findByIdAndUpdate(req.params.cardid, { $addToSet: { likes: req.user } }, { new: true })
    .populate(['owner', 'likes'])
    .orFail(new NotFoundError('Карточка с указанным _id не найдена'))
    .then((card) => {
      res.send(card);
    })
    .catch((err) => next(err));
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
