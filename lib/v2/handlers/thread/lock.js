var isAdmin = require('../../policies/isAdmin');

module.exports = {
  urls: [
    '/thread/lock/:id'
  ],
  routers: {
    post: function (req, res) {
      var Thread = req.models.Thread;
      var referer = req.get('referer');
      var extracted = req.extracted.params;
      Thread.findOne({
        id: extracted.id
      }).then(function (found) {
        found.locked = !found.locked;
        found.save(function () {
          var msg = '话题锁定成功！';
          if (!found.locked) {
            msg = '话题取消锁定成功！';
          }
          res.showPage('notify/notify', {
            success: msg,
            referer: referer
          });
        });
      }).fail(res.onError);
    }
  },
  policies: {
    all: isAdmin
  },
  validations: {
    post: {
      params: {
        id: {
          type: 'string',
          required: true
        }
      }
    }
  }
};
