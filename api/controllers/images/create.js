/**
 * Este metodo graba imagenes en un s3 y en una base de datos
 * el nombre de las imagenes deben ser friendly
 *
 * @param {*} req
 * @param {*} res
 */

module.exports = async (req, res) => {
  //save file
  const pathUnique = new Date().getTime();
  const fs = require('fs');
  //   req.file('image').upload(
  //     {
  //       adapter: require('skipper-s3'),
  //       key: sails.config.custom.AWS.AWS_KEY, //NOSONAR
  //       secret: sails.config.custom.AWS.AWS_SECRET, //NOSONAR
  //       region: sails.config.custom.AWS.REGION, //NOSONAR
  //       bucket: sails.config.custom.AWS.BUCKET, //NOSONAR
  //       headers: {
  //         'x-amz-acl': 'public-read'
  //       },
  //       saveAs: (file, cb) => {
  //         const extension = file.filename.split('.').pop();
  //         return cb(null, req.body.path + '-' + pathUnique + '.' + extension);
  //       }
  //     },
  //     async (err, filesUploaded) => {
  //       if (err) {
  //         return res.serverError(err);
  //       }
  //       const file = filesUploaded[0].fd.split('.');
  //       const extension = file.pop();
  //       const name = file.pop();

  //       //save to db
  //       const image = await Images.create({
  //         //NOSONAR
  //         name: req.body.name + '-' + pathUnique,
  //         language: req.headers.language,
  //         objectId: req.body.objectId,
  //         objectType: req.body.objectType,
  //         url: name,
  //         extension: extension,
  //         order: req.body.order
  //       }).fetch();
  //       //return the result
  //       sails.hooks.images.resize(filesUploaded[0].extra.Location, image);
  //       return res.ok({
  //         files: filesUploaded,
  //         image: image
  //       });
  //     }
  //   );

  const { createReadStream, filename, mimetype, encoding } = await req.file(
    'image'
  );
  const name = filename.split('.');
  const now = new Date();
  const dir = `images/banners/${now.getFullYear()}`;
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  const src = `${dir}/${name[0]}-${now.getTime()}.${name[1]}`;
  createReadStream()
    .pipe(fs.createWriteStream(`${src}`))
    .on('data', chunk => {
      console.log(chunk.toString());
    })
    .on('error', e => {
      console.log(e);
    });
};
