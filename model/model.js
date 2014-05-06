module.exports = function (mongoose) {
  var Schema = mongoose.Schema,
    _schema = {
      user: Schema({ /* User info */
        _id: {
          type: String,
          default: function () {
            return util.misc.getUID();
          }
        },
        username: String,
        password: String,
        nickname: String,
        gender: {
          /* true for man, false for woman */
          type: Boolean,
          /* default is man */
          default: true
        },
        /* format should be yyyy/mm/dd */
        birthdate: String,
        desciption: String,
        /* which will save friends _id */
        friends: [String],
        special: [{
          type: String,
          info: String,
          data: String
        }]
      }),

      chattext: Schema({ /* for chat */
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
      })
    };

  for (k in _schema) {
    mongoose.model(k, _schema[k]);
  }

  return true;
};
