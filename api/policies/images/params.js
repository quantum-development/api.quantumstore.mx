/**
 * params
 *
 * @module      :: Policy
 * @description :: Simple policy to validate image create parameters
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
module.exports = async (req, res, next) => {
  /*
    validate name
    name shouldn't be emtpy
    name should be between 4 to 100 chars
  */
  if (_.isUndefined(req.body.name) || _.isEmpty(req.body.name)) {
    return res.badRequest(null, {
      message: 'The name is required'
    });
  } else if (req.body.name.length < 4 || req.body.name.length > 100) {
    return res.badRequest(null, {
      message: 'The name should be between 4 to 100 chars'
    });
  }

  if (!req.body.objectId || !_.isNumber(req.body.objectId)) {
    return res.badRequest(
      {},
      {
        message: 'The objectId is required'
      }
    );
  }

  /**
   * Validate field objectType
   * it is required, must be a string and must exists
   */
  if (!req.body.objectType || !_.isString(req.body.objectType)) {
    return res.badRequest(
      {},
      {
        message: 'The objectType is required and must be string'
      }
    );
  }

  /*
    validate object Type
    The valid content types are in configuration files like custom.ALLOWED_OBJECT_TYPES
    if the file aren't in the list is mark as corrupted
  */
  if (
    !_.contains(sails.config.custom.ALLOWED_OBJECT_TYPES, req.body.objectType)
  ) {
    return res.badRequest(null, {
      message: 'objectType corrupted'
    });
  }

  /*
    validate images
    The images is required
  */
  if (!req._fileparser.upstreams.length) {
    return res.badRequest(null, {
      message: 'The image is required'
    });
  }

  const upload = req.file('image')._files[0].stream;
  const headers = upload.headers;
  const byteCount = upload.byteCount;
  /*
    validate content-type
    The valid content types are in configuration files like custom.ALLOWED_CONTENT_TYPES
    if the file aren't in the list is mark as corrupted
  */
  if (
    !_.contains(
      sails.config.custom.ALLOWED_CONTENT_TYPES,
      headers['content-type']
    )
  ) {
    return res.badRequest(null, {
      message: 'Image corrupted'
    });
  }

  /*
    validate file size
    The max file size are in configuration files like custom.MAX_BYTES
    if the file is more bigger than custom.MAX_BYTES, it's mark as exceeded
  */
  if (byteCount > sails.config.custom.MAX_BYTES) {
    return res.badRequest(null, {
      message: 'Filesize exceeded'
    });
  }

  return next();
};
