module.exports = function (mongoose) {
  var Schema = mongoose.Schema,
    _schema = {};
  _schema.user = new Schema({ /* User info */
    _id: {
      type: String,
      default: function () {
        return util.misc.getUID();
      }
    },
    account: { /* this should be email */
      type: String,
      index: true
    },
    password: String,
    nickname: { /* display name */
      type: String,
      index: true
    },
    gender: {
      /* true for man, false for woman */
      type: Boolean,
      /* default is man */
      default: true,
      index: true
    },
    /* format should be yyyy/mm/dd */
    birthdate: {
      type: String,
      index: true
    },
    desciption: String,
    /* which will save friends _id */
    friends: [String],
    special: [{
      type: String,
      info: String,
      data: String
    }]
  });

  _schema.chattext = new Schema({ /* for chat */
    _id: {
      type: String,
      default: function () {
        return util.misc.getUID();
      }
    },
    room: {
      type: String,
      index: true
    },
    time: {
      origin: {
        type: String,
        index: true
      },
      formatted: {
        type: String,
        index: true
      }
    },
    message: {
      type: String,
      index: true
    },
    special: {
      type: [String],
      index: true
    }
  });

  for (k in _schema) {
    mongoose.model(k, _schema[k]);
  }

  // return true;
};
